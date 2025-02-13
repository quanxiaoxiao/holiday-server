import assert from 'node:assert';

import dayjs from 'dayjs';

import isWorkDay from './isWorkDay.mjs';

const calcEnd = (is, start) => {
  let result = start;
  while (is(result)) {
    result = dayjs(result).add(1, 'day').valueOf();
  }
  while (!is(result)) {
    result = dayjs(result).add(1, 'day').valueOf();
  }
  result = dayjs(result).subtract(1, 'day').valueOf();
  const weekDayWithEndWork = dayjs(result).day();
  if (weekDayWithEndWork !== 0 && weekDayWithEndWork !== 6) {
    if (dayjs(start).isSame(result, 'week')) {
      result = dayjs(result).endOf('week').valueOf();
      while (!is(result)) {
        result = dayjs(result).add(1, 'day').valueOf();
      }
      result = dayjs(result).subtract(1, 'day').valueOf();
    }
  }
  assert(!is(result));
  return result;
};

const calcStart = (is, dateTime) => {
  let result = dateTime;
  if (is(result) && dayjs(result).day() === 0) {
    return result;
  }

  while (!is(result)) {
    result = dayjs(result).subtract(1, 'day').valueOf();
  }
  while (is(result)) {
    result = dayjs(result).subtract(1, 'day').valueOf();
  }
  result = dayjs(result).add(1, 'day').valueOf();
  assert(is(result));
  const weekDayWithStartWork = dayjs(result).day();
  if (weekDayWithStartWork !== 0 && weekDayWithStartWork !== 1) {
    let beforeDay = dayjs(result).startOf('week').valueOf();
    while (dayjs(beforeDay).isBefore(result, 'day')) {
      if (is(beforeDay)) {
        return beforeDay;
      }
      beforeDay = dayjs(beforeDay).add(1, 'day').valueOf();
    }
  }
  return result;
};

export default (holidayList, compenstationDayList) => {
  const is = isWorkDay(holidayList, compenstationDayList);
  return (dateTime) => {
    const start = calcStart(is, dateTime);
    const end = calcEnd(is, start);
    const diff = dayjs(end).diff(start, 'day');
    const result = [];
    for (let i = 0; i <= diff; i++) {
      const date = dayjs(start).add(i, 'day');
      result.push({
        dateTime: date.valueOf(),
        weekValue: date.day(),
        isWorkDay: is(date.valueOf()),
        name: date.format('YYYY-MM-DD'),
      });
    }
    return result;
  };
};

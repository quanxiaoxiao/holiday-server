import assert from 'node:assert';

import dayjs from 'dayjs';

import {
  addOneDay,
  isSunday,
  isWeekend,
  subtractOneDay,
} from './date.mjs';
import isWorkDay from './isWorkDay.mjs';

const calcEnd = (isWorkDayFn, start) => {
  let result = start;
  while (isWorkDayFn(result)) {
    result = addOneDay(result);
  }
  while (!isWorkDayFn(result)) {
    result = addOneDay(result);
  }
  result = subtractOneDay(result);
  if (!isWeekend(result)) {
    if (dayjs(start).isSame(result, 'week')) {
      result = dayjs(result).endOf('week').valueOf();
      while (!isWorkDayFn(result)) {
        result = addOneDay(result);
      }
      result = subtractOneDay(result);
    }
  }
  assert(!isWorkDayFn(result));
  return result;
};

const calcStart = (isWorkDayFn, dateTime) => {
  let result = dateTime;
  if (isWorkDayFn(result)
    && isSunday(result)
    && isWorkDayFn(addOneDay(result))
  ) {
    return result;
  }

  while (!isWorkDayFn(result)) {
    result = subtractOneDay(result);
  }
  while (isWorkDayFn(result)) {
    result = subtractOneDay(result);
  }
  result = addOneDay(result);
  assert(isWorkDayFn(result));
  const weekDayWithStartWork = dayjs(result).day();
  if (weekDayWithStartWork !== 0 && weekDayWithStartWork !== 1) {
    let beforeDay = dayjs(result).startOf('week').valueOf();
    while (dayjs(beforeDay).isBefore(result, 'day')) {
      if (isWorkDayFn(beforeDay)) {
        return beforeDay;
      }
      beforeDay = addOneDay(beforeDay);
    }
  }
  return result;
};

export default (holidayList, compenstationDayList) => {
  const isWorkDayFn = isWorkDay(holidayList, compenstationDayList);
  return (dateTime) => {
    const start = calcStart(isWorkDayFn, dateTime);
    const end = calcEnd(isWorkDayFn, start);
    const diff = dayjs(end).diff(start, 'day');
    const result = [];
    for (let i = 0; i <= diff; i++) {
      const date = dayjs(start).add(i, 'day');
      result.push({
        dateTime: date.valueOf(),
        weekValue: date.day(),
        isWorkDay: isWorkDayFn(date.valueOf()),
        name: date.format('YYYY-MM-DD'),
      });
    }
    return result;
  };
};

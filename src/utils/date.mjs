import dayjs from 'dayjs';

export const isSameDay = (dateTime1, dateTime2) => dayjs(dateTime1).isSame(dateTime2, 'day');

export const isYesterday = (current, other) => isSameDay(dayjs(current).subtract(1, 'day'), other);

export const isTomorrowday = (current, other) => isSameDay(dayjs(current).add(1, 'day'), other);

export const isSunday = (dateTime) => dayjs(dateTime).day() === 0;

export const isSaturday = (dateTime) => dayjs(dateTime).day() === 6;

export const addOneDay = (dateTime) => dayjs(dateTime).startOf('day').add(1, 'day').valueOf();

export const subtractOneDay = (dateTime) => dayjs(dateTime).startOf('day').subtract(1, 'day').valueOf();

export const getDateTimeRange = (start, end) => {
  const dateStart = dayjs(start).startOf('day');
  const diff = dayjs(end).diff(start, 'day');
  const result = [];
  for (let i = 0; i <= diff; i++) {
    result.push(dateStart.clone().add(i, 'day').valueOf());
  }
  return result;
};

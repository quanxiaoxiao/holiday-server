import dayjs from 'dayjs';

export default (holidayList, compenstationDayList) => (dateTime) => {
  const date = dayjs(dateTime).startOf('day');
  if (date.day() === 6 || date.day() === 0) {
    return compenstationDayList.some((d) => date.isSame(d, 'day'));
  }
  return !holidayList.some((d) => date.isSame(d, 'day'));
};

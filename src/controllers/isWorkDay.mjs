import { generateDateTimeRange } from '../utils/date.mjs';
import isWorkDay from '../utils/isWorkDay.mjs';
import getCompenstationDays from './compenstationDay/getCompenstationDays.mjs';
import getHolidays from './holiday/getHolidays.mjs';

export default async (dateTime) => {
  const [holidayList, compenstationDayList] = await Promise.all(
    getHolidays(),
    getCompenstationDays(),
  );
  return isWorkDay(
    holidayList.reduce((acc, cur) => [...acc, ...generateDateTimeRange(cur.dateTimeStart, cur.dateTimeEnd)], []),
    compenstationDayList.map((d) => d.dateTime),
  )(dateTime);
};

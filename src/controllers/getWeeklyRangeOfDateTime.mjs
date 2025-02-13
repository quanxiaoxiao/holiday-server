import calcWeeklyRange from '../utils/calcWeeklyRange.mjs';
import { getDateTimeRange } from '../utils/date.mjs';
import getCompenstationDays from './compenstationDay/getCompenstationDays.mjs';
import getHolidays from './holiday/getHolidays.mjs';

export default async (dateTime) => {
  const holidayList = await getHolidays();
  const compenstationDayList = await getCompenstationDays();
  const compenstationDayDateTimeList = compenstationDayList.map((d) => d.dateTime);
  const holidayListDateTimeList = holidayList
    .map((d) => getDateTimeRange(d.dateTimeStart, d.dateTimeEnd))
    .reduce((acc, cur) => [...acc, ...cur], []);
  const arr = calcWeeklyRange(
    holidayListDateTimeList,
    compenstationDayDateTimeList,
  )(dateTime);
  return arr;
};

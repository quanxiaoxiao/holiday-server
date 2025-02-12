import getCompenstationOfDateTime from '../controllers/compenstationDay/getCompenstationOfDateTime.mjs';
import appendHolidayOfDateTime from '../controllers/holiday/appendHolidayOfDateTime.mjs';
import getHolidayOfDateTime from '../controllers/holiday/getHolidayOfDateTime.mjs';
import {
  addOneDay,
  isSaturday,
  isSunday,
  subtractOneDay,
} from '../utils/date.mjs';

const adjustToHoliday = async (holidayItem, dir) => {
  const dateTime = dir === -1
    ? subtractOneDay(holidayItem.dateTimeStart)
    : addOneDay(holidayItem.dateTimeEnd);
  if (!isSunday(dateTime) && !isSaturday(dateTime)) {
    return holidayItem;
  }
  if (await getCompenstationOfDateTime(dateTime)) {
    return holidayItem;
  }
  if (await getHolidayOfDateTime(dateTime)) {
    return holidayItem;
  }
  const holidayItemNext = await appendHolidayOfDateTime(dateTime);
  return adjustToHoliday(holidayItemNext, dir);
};

export default adjustToHoliday;

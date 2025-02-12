import dayjs from 'dayjs';
import createError from 'http-errors';

import createHoliday from './createHoliday.mjs';
import getHolidayOfDateTime from './getHolidayOfDateTime.mjs';
import removeHoliday from './removeHoliday.mjs';
import updateHoliday from './updateHoliday.mjs';

export default async (dateTime) => {
  const holidayItem = await getHolidayOfDateTime(dateTime);
  if (!holidayItem) {
    throw createError(404);
  }
  if (dayjs(holidayItem.dateTimeStart).isSame(holidayItem.dateTimeEnd, 'day')) {
    await removeHoliday(holidayItem);
    return [];
  }
  if (dayjs(holidayItem.dateTimeStart).isSame(dateTime, 'day')) {
    const holidayItemNext = await updateHoliday(holidayItem, {
      dateTimeStart: dayjs(dateTime).startOf('day').add(1, 'day').valueOf(),
    });
    return [holidayItemNext];
  }
  if (dayjs(holidayItem.dateTimeEnd).isSame(dateTime, 'day')) {
    const holidayItemNext = await updateHoliday(holidayItem, {
      dateTimeEnd: dayjs(dateTime).startOf('day').subtract(1, 'day').valueOf(),
    });
    return [holidayItemNext];
  }

  const holidayItemNext1 = await updateHoliday(holidayItem, {
    dateTimeEnd: dayjs(dateTime).startOf('day').subtract(1, 'day').valueOf(),
  });
  const holidayItemNext2 = await createHoliday({
    dateTimeStart: dayjs(dateTime).startOf('day').add(1, 'day').valueOf(),
    dateTimeEnd: holidayItem.dateTimeEnd,
  });
  return [holidayItemNext1, holidayItemNext2];
};

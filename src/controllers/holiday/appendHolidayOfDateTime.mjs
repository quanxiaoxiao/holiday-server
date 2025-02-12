import dayjs from 'dayjs';
import createError from 'http-errors';

import logger from '../../logger.mjs';
import createHoliday from './createHoliday.mjs';
import getHolidayOfDateTime from './getHolidayOfDateTime.mjs';
import removeHoliday from './removeHoliday.mjs';
import updateHoliday from './updateHoliday.mjs';

export default async (dateTime) => {
  const matched = await getHolidayOfDateTime(dateTime);
  if (matched) {
    logger.warn(`\`appendHolidayOfDateTime\` fail, holiday already set \`dateTimeStart:${matched.dateTimeStart}, dateTimeEnd:${matched.dateTimeEnd}\``);
    throw createError(403);
  }
  const date = dayjs(dateTime).startOf('day');

  const [pre, next] = await Promise.all([
    getHolidayOfDateTime(date.clone().subtract(1, 'day')),
    getHolidayOfDateTime(date.clone().add(1, 'day')),
  ]);
  if (!pre && !next) {
    const holidayItem = await createHoliday({
      dateTimeStart: date.valueOf(),
      dateTimeEnd: date.valueOf(),
    });
    return holidayItem;
  }
  if (pre && !next) {
    const holidayMergedItem = await updateHoliday(pre, {
      dateTimeEnd: date.valueOf(),
    });
    return holidayMergedItem;
  }
  if (!pre && next) {
    const holidayMergedItem = await updateHoliday(next, {
      dateTimeStart: date.valueOf(),
    });
    return holidayMergedItem;
  }
  await removeHoliday(next);
  const holidayMergedItem = await updateHoliday(pre, {
    dateTimeEnd: next.dateTimeEnd,
  });
  return holidayMergedItem;
};

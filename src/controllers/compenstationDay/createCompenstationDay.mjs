import dayjs from 'dayjs';
import createError from 'http-errors';

import logger from '../../logger.mjs';
import { CompenstationDay as CompenstationDayModel } from '../../models/index.mjs';
import { isSaturday, isSunday } from '../../utils/date.mjs';
import getCompenstationOfDateTime from './getCompenstationOfDateTime.mjs';

export default async (dateTime) => {
  const date = dayjs(dateTime);
  if (!isSunday(date) && !isSaturday(dateTime)) {
    logger.warn(`\`createCompenstationDay\` fail, \`dateTime:${dateTime}\` week is not sunday or saturday`);
    throw createError(400);
  }
  const matched = await getCompenstationOfDateTime(dateTime);
  if (matched) {
    logger.warn(`\`createCompenstationDay\` fail, \`dateTime:${dateTime}\` alreay set`);
    throw createError(403);
  }
  const compenstationDayItem = new CompenstationDayModel({
    dateTime: date.startOf('day').valueOf(),
  });
  await compenstationDayItem.save();
  return compenstationDayItem;
};

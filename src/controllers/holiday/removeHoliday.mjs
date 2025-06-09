import createError from 'http-errors';

import logger from '../../logger.mjs';
import { Holiday as HolidayModel } from '../../models/index.mjs';

export default async (holidayItem) => {
  const result = await HolidayModel.deleteOne({
    _id: holidayItem._id,
  });
  if (result.modifiedCount === 0) {
    throw createError(404);
  }
  logger.warn(`\`removeHoliday:${holidayItem._id}\``);
};

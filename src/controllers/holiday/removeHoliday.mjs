import logger from '../../logger.mjs';
import { Holiday as HolidayModel } from '../../models/index.mjs';

export default async (holidayItem) => {

  logger.warn(`\`removeHoliday:${holidayItem._id}\``);

  await HolidayModel.deleteOne({
    _id: holidayItem._id,
  });
};

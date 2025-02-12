import dayjs from 'dayjs';
import createError from 'http-errors';

import logger from '../../logger.mjs';
import { Holiday as HolidayModel } from '../../models/index.mjs';

export default async (input) => {
  if (input.dateTimeStart > input.dateTimeEnd) {
    throw createError(400);
  }
  const data = {
    ...input,
    dateTimeStart: dayjs(input.dateTimeStart).startOf('day').valueOf(),
    dateTimeEnd: dayjs(input.dateTimeEnd).startOf('day').valueOf(),
  };
  const matched = await HolidayModel.findOne({
    $or: [
      {
        dateTimeStart: {
          $lte: dayjs(data.dateTimeStart).endOf('day').valueOf(),
        },
        dateTimeEnd: {
          $gte: dayjs(data.dateTimeStart).startOf('day').valueOf(),
        },
      },
      {
        dateTimeStart: {
          $lte: dayjs(data.dateTimeEnd).endOf('day').valueOf(),
        },
        dateTimeEnd: {
          $gte: dayjs(data.dateTimeEnd).startOf('day').valueOf(),
        },
      },
    ],
  });
  if (matched) {
    logger.warn(`\`createHoliday\` fail, holiday already set \`dateTimeStart:${matched.dateTimeStart}, dateTimeEnd:${matched.dateTimeEnd}\``);
    throw createError(403);
  }
  const holidayItem = new HolidayModel(data);
  await holidayItem.save();
  logger.warn(`\`createHoliday\` \`${JSON.stringify(input)}\``);
  return holidayItem;
};

import dayjs from 'dayjs';
import createError from 'http-errors';

import logger from '../../logger.mjs';
import { Holiday as HolidayModel } from '../../models/index.mjs';

export default async (holidayItem, input) => {
  const dateTimeRange = {
    dateTimeStart: holidayItem.dateTimeStart,
    dateTimeEnd: holidayItem.dateTimeEnd,
  };
  if (Object.hasOwnProperty.call(input, 'dateTimeStart')) {
    dateTimeRange.dateTimeStart = dayjs(input.dateTimeStart).startOf('day').valueOf();
  }
  if (Object.hasOwnProperty.call(input, 'dateTimeEnd')) {
    dateTimeRange.dateTimeEnd = dayjs(input.dateTimeEnd).startOf('day').valueOf();
  }
  if (dateTimeRange.dateTimeEnd < dateTimeRange.dateTimeStart) {
    throw new createError(400);
  }
  const matched = await HolidayModel.findOne({
    _id: {
      $ne: holidayItem._id,
    },
    $or: [
      {
        dateTimeStart: {
          $lte: dayjs(dateTimeRange.dateTimeStart).endOf('day').valueOf(),
        },
        dateTimeEnd: {
          $gte: dayjs(dateTimeRange.dateTimeStart).startOf('day').valueOf(),
        },
      },
      {
        dateTimeStart: {
          $lte: dayjs(dateTimeRange.dateTimeEnd).endOf('day').valueOf(),
        },
        dateTimeEnd: {
          $gte: dayjs(dateTimeRange.dateTimeEnd).startOf('day').valueOf(),
        },
      },
    ],
  });
  if (matched) {
    logger.warn(`\`updateHoliday\` fail, holiday already set \`dateTimeStart:${matched.dateTimeStart}, dateTimeEnd:${matched.dateTimeEnd}\``);
    throw createError(403);
  }
  const holidayItemNext = await HolidayModel.findOneAndUpdate(
    {
      _id: holidayItem._id,
    },
    {
      $set: {
        ...input,
      },
    },
    {
      new: true,
    },
  );

  logger.warn(`\`updateHoliday\` \`${JSON.stringify(input)}\``);

  return holidayItemNext;
};

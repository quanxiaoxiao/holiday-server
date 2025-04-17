import createError from 'http-errors';

import logger from '../../logger.mjs';
import { AbsenceDay as AbsenceDayModel } from '../../models/index.mjs';
import {
  isSameDay,
  toDayEnd,
  toDayStart,
} from '../../utils/date.mjs';

export default async (input) => {
  const data = {
    ...input,
  };

  if (input.dateTimeRanges) {
    for (let i = 0; i < data.dateTimeRanges.length; i++) {
      const rangeItem = data.dateTimeRanges[i];
      if (rangeItem.length !== 2) {
        throw createError(400);
      }
      const [dateTimeStart, dateTimeEnd] = rangeItem;
      if (!isSameDay(data.dateTime, dateTimeStart)
        || !isSameDay(data.dateTime, dateTimeEnd)
      ) {
        throw createError(400);
      }
    }
  }

  const matched = await AbsenceDayModel.findOne({
    dateTime: {
      $gte: toDayStart(data.dateTime),
      $lte: toDayEnd(data.dateTime),
    },
  });

  if (matched) {
    throw createError(403);
  }

  const absenceDayItem = new AbsenceDayModel({
    ...data,
  });

  await absenceDayItem.save();

  logger.warn(`createAbsenceDay \`${JSON.stringify(input)}\``);
};

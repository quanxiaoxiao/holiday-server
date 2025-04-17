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

  if (data.dateTimeRanges) {
    for (let i = 0; i < data.dateTimeRanges.length; i++) {
      const rangeItem = data.dateTimeRanges[i];
      if (rangeItem.length !== 2) {
        throw createError(400);
      }
      const [dateTimeStart, dateTimeEnd] = rangeItem;
      if (dateTimeStart > dateTimeEnd) {
        throw createError(400);
      }
      if (data.dateTime != null) {
        if (!isSameDay(data.dateTime, dateTimeStart)
          || !isSameDay(data.dateTime, dateTimeEnd)
        ) {
          throw createError(400);
        }
      } else {
        if (!isSameDay(dateTimeStart, dateTimeEnd)) {
          throw createError(400);
        }
        data.dateTime = toDayStart(dateTimeStart);
      }
    }
  } else {
    data.dateTimeRanges = [];
  }

  if (data.dateTime == null) {
    throw createError(400);
  }

  const matched = await AbsenceDayModel.findOne({
    invalid: {
      $ne: true,
    },
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
  return absenceDayItem;
};

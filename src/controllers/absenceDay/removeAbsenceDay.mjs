import createError from 'http-errors';

import logger from '../../logger.mjs';
import { AbsenceDay as AbsenceDayModel } from '../../models/index.mjs';

export default async (absenceDayItem) => {
  const result = await AbsenceDayModel.findOneAndUpdate(
    {
      _id: absenceDayItem._id,
      invalid: {
        $ne: true,
      },
    },
    {
      $set: {
        invalid: true,
        dateTimeInvalid: Date.now(),
      },
    },
  );
  if (result.modifiedCount === 0) {
    throw createError(404);
  }
  logger.warn(`removeAbsenceDay \`${absenceDayItem._id}\``);
};

import logger from '../../logger.mjs';
import { AbsenceDay as AbsenceDayModel } from '../../models/index.mjs';

export default async (absenceDayItem) => {
  await AbsenceDayModel.findOneAndUpdate(
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
  logger.warn(`removeAbsenceDay \`${absenceDayItem._id}\``);
};

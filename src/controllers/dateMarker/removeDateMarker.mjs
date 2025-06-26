import createError from 'http-errors';

import logger from '../../logger.mjs';
import { DateMarker as DateMarkerModel } from '../../models/index.mjs';

export default async (dateMarkerItem) => {
  const result = await DateMarkerModel.updateOne(
    {
      _id: dateMarkerItem._id,
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

  logger.warn(`removeDateMarker \`${dateMarkerItem._id}\``);
};

import createError from 'http-errors';

import logger from '../../logger.mjs';
import { DateMarker as DateMarkerModel } from '../../models/index.mjs';

export default async (dateMarkerItem, input) => {
  const dateMarkerItemNext = Object.assert({}, dateMarkerItem.toObject?.() || dateMarkerItem, input);
  const tempInstance = new DateMarkerModel(dateMarkerItemNext);
  try {
    await tempInstance.validate();
  } catch (error) {
    throw createError(400, JSON.stringify(error.errors));
  }
  const result = await DateMarkerModel.updateOne(
    {
      _id: dateMarkerItem._id,
      invalid: {
        $ne: true,
      },
    },
    {
      $set: {
        ...input,
      },
    },
  );
  if (result.modifiedCount === 0) {
    throw createError(404);
  }
  logger.warn(`updateDateMarker \`${dateMarkerItem._id}\` \`${JSON.stringify(input)}\``);
  return dateMarkerItemNext;
};

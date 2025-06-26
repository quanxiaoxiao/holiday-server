import createError from 'http-errors';

import logger from '../../logger.mjs';
import { DateMarker as DateMarkerModel } from '../../models/index.mjs';

export default async (input) => {
  const dateMarkerItem = new DateMarkerModel({
    ...input,
  });
  try {
    await dateMarkerItem.validate();
  } catch (error) {
    throw createError(400, JSON.stringify(error.errors));
  }

  await dateMarkerItem.save();

  logger.warn(`createDateMarker \`${JSON.stringify(input)}\``);

  return dateMarkerItem;
};

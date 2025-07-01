import createError from 'http-errors';

import logger from '../../logger.mjs';
import { DateMarker as DateMarkerModel } from '../../models/index.mjs';
import { toDayStart } from '../../utils/date.mjs';

export default async (input) => {
  const dateMarkerItem = new DateMarkerModel({
    ...input,
    dateTime: toDayStart(input.dateTime),
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

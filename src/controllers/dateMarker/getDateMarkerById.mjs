import { isValidObjectId } from '@quanxiaoxiao/mongo';

import { DateMarker as DateMarkerModel } from '../../models/index.mjs';

export default async (dateMarker) => {
  if (!isValidObjectId(dateMarker)) {
    return null;
  }
  const dateMarkerItem = await DateMarkerModel.findOne({
    _id: dateMarker,
    invalid: {
      $ne: true,
    },
  });
  return dateMarkerItem;
};

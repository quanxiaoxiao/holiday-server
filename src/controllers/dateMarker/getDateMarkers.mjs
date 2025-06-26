import { DateMarker as DateMarkerModel } from '../../models/index.mjs';

export default async () => {
  const dateMarkerList = await DateMarkerModel
    .find({
      invalid: {
        $ne: true,
      },
    })
    .lean();
  return dateMarkerList;
};

import { Holiday as HolidayModel } from '../../models/index.mjs';

export default async () => {
  const list = await HolidayModel
    .find({})
    .sort({
      dateTimeStart: 1,
    })
    .lean();
  return list;
};

import { CompenstationDay as CompenstationDayModel } from '../../models/index.mjs';

export default async () => {
  const compenstationDayList = await CompenstationDayModel
    .find({})
    .lean();

  return compenstationDayList;
};

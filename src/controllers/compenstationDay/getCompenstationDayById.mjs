import { isValidObjectId } from '@quanxiaoxiao/mongo';

import { CompenstationDay as CompenstationDayModel } from '../../models/index.mjs';

export default async (_id) => {
  if (!isValidObjectId(_id)) {
    return null;
  }
  const compenstationDayItem = await CompenstationDayModel
    .findOne({
      _id,
    })
    .lean();

  return compenstationDayItem;
};

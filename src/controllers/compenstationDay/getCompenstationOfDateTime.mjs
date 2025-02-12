import dayjs from 'dayjs';

import { CompenstationDay as CompenstationDayModel } from '../../models/index.mjs';

export default async (dateTime) => {
  const compenstationDayItem = await CompenstationDayModel
    .findOne({
      dateTime: {
        $gte: dayjs(dateTime).startOf('day').valueOf(),
        $lte: dayjs(dateTime).endOf('day').valueOf(),
      },
    })
    .lean();

  return compenstationDayItem;
};

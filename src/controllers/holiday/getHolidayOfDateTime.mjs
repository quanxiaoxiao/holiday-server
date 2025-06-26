import dayjs from 'dayjs';

import { Holiday as HolidayModel } from '../../models/index.mjs';

export default async (dateTime) => {
  if (Number.isNaN(dateTime) || dateTime == null) {
    return null;
  }
  const holidayItem = await HolidayModel.findOne({
    dateTimeStart: {
      $lte: dayjs(dateTime).endOf('day').valueOf(),
    },
    dateTimeEnd: {
      $gte: dayjs(dateTime).startOf('day').valueOf(),
    },
  })
    .lean();

  return holidayItem;
};

import logger from '../../logger.mjs';
import { CompenstationDay as CompenstationDayModel } from '../../models/index.mjs';

export default async (compenstationDayItem) => {
  logger.warn(`\`removeCompenstationDay:${compenstationDayItem._id}\``);
  await CompenstationDayModel.deleteOne({
    _id: compenstationDayItem._id,
  });
};

import mongoose from 'mongoose';

import compenstationDaySchema from './compenstationDay.mjs';
import holidaySchema from './holiday.mjs';

export const Holiday = mongoose.model('Holiday', holidaySchema);
export const CompenstationDay = mongoose.model('CompenstationDay', compenstationDaySchema);

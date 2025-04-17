import mongoose from 'mongoose';

import absenceDaySchema from './absenceDay.mjs';
import compenstationDaySchema from './compenstationDay.mjs';
import holidaySchema from './holiday.mjs';

export const Holiday = mongoose.model('Holiday', holidaySchema);
export const AbsenceDay = mongoose.model('AbsenceDay', absenceDaySchema);
export const CompenstationDay = mongoose.model('CompenstationDay', compenstationDaySchema);

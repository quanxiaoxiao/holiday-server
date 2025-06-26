import mongoose from 'mongoose';

import compenstationDaySchema from './compenstationDay.mjs';
import dateMarkerSchema from './dateMarker.mjs';
import holidaySchema from './holiday.mjs';

export const Holiday = mongoose.model('Holiday', holidaySchema);
export const CompenstationDay = mongoose.model('CompenstationDay', compenstationDaySchema);
export const DateMarker = mongoose.model('DateMarker', dateMarkerSchema);

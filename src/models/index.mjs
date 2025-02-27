import mongoose from 'mongoose';

import compenstationDaySchema from './compenstationDay.mjs';
import holidaySchema from './holiday.mjs';
import todoSchema from './todo.mjs';

export const Holiday = mongoose.model('Holiday', holidaySchema);
export const CompenstationDay = mongoose.model('CompenstationDay', compenstationDaySchema);
export const Todo = mongoose.model('Todo', todoSchema);

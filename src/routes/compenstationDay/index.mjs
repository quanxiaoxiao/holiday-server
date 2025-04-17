import createError from 'http-errors';

import adjustToHoliday from '../../controllers/adjustToHoliday.mjs';
import createCompenstationDay from '../../controllers/compenstationDay/createCompenstationDay.mjs';
import getCompenstationDays from '../../controllers/compenstationDay/getCompenstationDays.mjs';
import getCompenstationOfDateTime from '../../controllers/compenstationDay/getCompenstationOfDateTime.mjs';
import removeCompenstationDay from '../../controllers/compenstationDay/removeCompenstationDay.mjs';
import getHolidayOfDateTime from '../../controllers/holiday/getHolidayOfDateTime.mjs';
import removeHoliday from '../../controllers/holiday/removeHoliday.mjs';
import removeHolidayOfDateTime from '../../controllers/holiday/removeHolidayOfDateTime.mjs';
import {
  addOneDay,
  generateDateTimeRange,
  isSaturday,
  isSunday,
  subtractOneDay,
} from '../../utils/date.mjs';

export default {
  '/api/compenstationdays': {
    get: async (ctx) => {
      const compenstationDayList = await getCompenstationDays();
      ctx.response = {
        data: compenstationDayList,
      };
    },
  },
  '/api/compenstationday/:dateTime': {
    delete: async (ctx) => {
      const dateTime = Number(ctx.request.params.dateTime);
      if (Number.isNaN(dateTime)) {
        throw createError(404);
      }
      if (`${dateTime}` !== ctx.request.params.dateTime) {
        throw createError(404);
      }
      const compenstationDayItem = await getCompenstationOfDateTime(dateTime);
      if (!compenstationDayItem) {
        throw createError(404);
      }
      await removeCompenstationDay(compenstationDayItem);
      if (isSaturday(dateTime)) {
        let holidayItem = await getHolidayOfDateTime(subtractOneDay(dateTime));
        if (holidayItem) {
          await adjustToHoliday(holidayItem, 1);
        } else if (!await getCompenstationOfDateTime(addOneDay(dateTime))) {
          holidayItem = await getHolidayOfDateTime(addOneDay(addOneDay(dateTime)));
          if (holidayItem) {
            await adjustToHoliday(holidayItem, -1);
          }
        }
      } else {
        let holidayItem = await getHolidayOfDateTime(addOneDay(dateTime));
        if (holidayItem) {
          await adjustToHoliday(holidayItem, -1);
        } else if (!await getCompenstationOfDateTime(subtractOneDay(dateTime))) {
          holidayItem = await getHolidayOfDateTime(subtractOneDay(subtractOneDay(dateTime)));
          if (holidayItem) {
            await adjustToHoliday(holidayItem, 1);
          }
        }
      }
      ctx.response = {
        data: compenstationDayItem,
      };
    },
  },
  '/api/compenstationday': {
    post: {
      validate: {
        type: 'object',
        properties: {
          dateTime: {
            type: 'number',
          },
        },
        required: ['dateTime'],
        additionalProperties: false,
      },
      fn: async (ctx)=> {
        const { dateTime } = ctx.request.data;
        const compenstationDayItem = await createCompenstationDay(dateTime);
        const holidayItem = await getHolidayOfDateTime(dateTime);
        if (holidayItem) {
          const arr = await removeHolidayOfDateTime(dateTime);
          await arr.reduce(async (acc, cur) => {
            await acc;
            const dateTimeList = generateDateTimeRange(cur.dateTimeStart, cur.dateTimeEnd);
            if (dateTimeList.every((time) => isSunday(time) || isSaturday(time))) {
              await removeHoliday(cur);
            }
          }, Promise.resolve);
        }
        ctx.response = {
          data: compenstationDayItem,
        };
      },
    },
  },
};

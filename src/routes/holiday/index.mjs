import createError from 'http-errors';

import adjustToHoliday from '../../controllers/adjustToHoliday.mjs';
import appendHolidayOfDateTime from '../../controllers/holiday/appendHolidayOfDateTime.mjs';
import getHolidays from '../../controllers/holiday/getHolidays.mjs';
import removeHoliday from '../../controllers/holiday/removeHoliday.mjs';
import removeHolidayOfDateTime from '../../controllers/holiday/removeHolidayOfDateTime.mjs';
import updateHoliday from '../../controllers/holiday/updateHoliday.mjs';
import {
  generateDateTimeRnage,
  isSaturday,
  isSunday,
} from '../../utils/date.mjs';

export default {
  '/api/holidays': {
    get: async (ctx) => {
      const holidayList = await getHolidays();

      ctx.response = {
        data: holidayList,
      };
    },
  },
  '/api/holiday': {
    post: {
      validate: {
        type: 'object',
        properties: {
          dateTime: {
            type: 'number',
          },
          description: {
            type: 'string',
          },
        },
        required: ['dateTime'],
        additionalProperties: false,
      },
      fn: async (ctx)=> {
        let holidayItem = await appendHolidayOfDateTime(ctx.request.data.dateTime);
        holidayItem = await adjustToHoliday(holidayItem, -1);
        holidayItem = await adjustToHoliday(holidayItem, 1);
        if (Object.hasOwnProperty.call(ctx.request.data, 'description')) {
          holidayItem = await updateHoliday(holidayItem, { description: ctx.request.data.description });
        }
        ctx.response = {
          data: holidayItem,
        };
      },
    },
  },
  '/api/holiday/:dateTime': {
    delete: async (ctx) => {
      const dateTime = Number(ctx.request.params.dateTime);
      if (Number.isNaN(dateTime)) {
        throw createError(404);
      }
      if (`${dateTime}` !== ctx.request.params.dateTime) {
        throw createError(404);
      }
      const arr = await removeHolidayOfDateTime(dateTime);
      await arr.reduce(async (acc, cur) => {
        await acc;
        const dateTimeList = generateDateTimeRnage(cur.dateTimeStart, cur.dateTimeEnd);
        if (dateTimeList.every((time) => isSunday(time) || isSaturday(time))) {
          await removeHoliday(cur);
        }
      }, Promise.resolve);
      const holidayList = await getHolidays();
      ctx.response = {
        data: holidayList,
      };
    },
  },
};

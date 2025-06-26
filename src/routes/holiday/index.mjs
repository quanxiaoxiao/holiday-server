import createError from 'http-errors';
import _ from 'lodash';

import adjustToHoliday from '../../controllers/adjustToHoliday.mjs';
import appendHolidayOfDateTime from '../../controllers/holiday/appendHolidayOfDateTime.mjs';
import getHolidayOfDateTime from '../../controllers/holiday/getHolidayOfDateTime.mjs';
import getHolidays from '../../controllers/holiday/getHolidays.mjs';
import removeHoliday from '../../controllers/holiday/removeHoliday.mjs';
import removeHolidayOfDateTime from '../../controllers/holiday/removeHolidayOfDateTime.mjs';
import updateHoliday from '../../controllers/holiday/updateHoliday.mjs';
import {
  generateDateTimeRange,
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
          name: {
            type: 'string',
          },
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
        if (Object.hasOwnProperty.call(ctx.request.data, 'description')
          || Object.hasOwnProperty.call(ctx.request.data, 'name')
        ) {
          holidayItem = await updateHoliday(holidayItem, _.pick(ctx.request.data, ['name', 'description']));
        }
        ctx.response = {
          data: holidayItem,
        };
      },
    },
  },
  '/api/holiday/:dateTime': {
    onPre: async (ctx) => {
      const dateTime = Number(ctx.request.params.dateTime);
      if (Number.isNaN(dateTime)) {
        throw createError(404);
      }
      if (`${dateTime}` !== ctx.request.params.dateTime) {
        throw createError(404);
      }
      const holidayItem = await getHolidayOfDateTime(dateTime);
      if (!holidayItem) {
        throw createError(404);
      }
      ctx.holidayItem = holidayItem;
    },
    put: {
      validate: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            nullable: true,
          },
          description: {
            type: 'string',
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      fn: async (ctx) => {
        const holidayItemNext = await updateHoliday(ctx.holidayItem, ctx.request.data);
        ctx.response = {
          data: holidayItemNext,
        };
      },
    },
    get: (ctx) => {
      ctx.response = {
        data: ctx.holidayItem,
      };
    },
    delete: async (ctx) => {
      const arr = await removeHolidayOfDateTime(Number(ctx.request.params.dateTime));
      await arr.reduce(async (acc, cur) => {
        await acc;
        const dateTimeList = generateDateTimeRange(cur.dateTimeStart, cur.dateTimeEnd);
        if (dateTimeList.every((time) => isSunday(time) || isSaturday(time))) {
          await removeHoliday(cur);
        }
      }, Promise.resolve);
      ctx.response = {
        data: ctx.holidayItem,
      };
    },
  },
};

import createError from 'http-errors';

import createAbsenceDay from '../../controllers/absenceDay/createAbsenceDay.mjs';
import isWorkDay from '../../controllers/isWorkDay.mjs';

export default {
  '/api/absence-day': {
    post: {
      validate: {
        type: 'object',
        properties: {
          dateTime: {
            type: 'number',
            nullable: true,
          },
          dateTimeRange: {
            type: 'array',
            items: {
              type: 'array',
              items: {
                type: 'number',
              },
            },
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
        const isWork = await isWorkDay(ctx.request.data.dateTime);
        if (!isWork) {
          throw createError(403);
        }
        const absenceDayItem = await createAbsenceDay(ctx.request.data);
        ctx.response = {
          data: absenceDayItem,
        };
      },
    },
  },
};

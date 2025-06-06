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
        },
      },
      fn: async (ctx) => {
        const isWork = await isWorkDay(ctx.request.data.dateTime);

      },
    },
  },
};

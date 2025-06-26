import createError from 'http-errors';

import createDateMarker from '../../controllers/dateMarker/createDateMarker.mjs';
import getDateMarkerById from '../../controllers/dateMarker/getDateMarkerById.mjs';
import getDateMarkers from '../../controllers/dateMarker/getDateMarkers.mjs';
import removeDateMarker from '../../controllers/dateMarker/removeDateMarker.mjs';

export default {
  '/api/date-markers': {
    get: async (ctx) => {
      const dateMarkerList = await getDateMarkers();
      ctx.response = {
        data: dateMarkerList,
      };
    },
  },
  '/api/date-marker': {
    post: {
      validate: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            nullable: true,
          },
          dateTime: {
            type: 'number',
          },
          description: {
            type: 'string',
            nullable: true,
          },
          color: {
            type: 'string',
            nullable: true,
          },
          icon: {
            type: 'string',
            nullable: true,
          },
        },
        required: ['dateTime'],
        additionalProperties: false,
      },
      fn: async (ctx) => {
        const dateMarkerItem = await createDateMarker(ctx.request.data);
        ctx.response = {
          data: dateMarkerItem,
        };
      },
    },
  },
  '/api/date-marker/:id': {
    onPre: async (ctx) => {
      const dateMarkerItem = await getDateMarkerById(ctx.request.params.id);
      if (!dateMarkerItem) {
        throw createError(404);
      }
      ctx.dateMarkerItem = dateMarkerItem;
    },
    get: (ctx) => {
      ctx.response = {
        data: ctx.dateMarkerItem,
      };
    },
    delete: async (ctx) => {
      await removeDateMarker(ctx.dateMarkerItem);
      ctx.response = {
        data: ctx.dateMarkerItem,
      };
    },
  },
};

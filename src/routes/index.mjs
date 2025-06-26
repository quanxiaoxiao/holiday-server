import fs from 'node:fs';
import path from 'node:path';

import { toDataify } from '@quanxiaoxiao/node-utils';

import getWeeklyRangeOfDateTime from '../controllers/getWeeklyRangeOfDateTime.mjs';
import { getState } from '../store/store.mjs';
import compenstationDay from './compenstationDay/index.mjs';
import dateMarker from './dateMarker/index.mjs';
import holiday from './holiday/index.mjs';

export default {
  '/api/state': {
    put: (ctx) => {
      fs.writeFileSync(path.resolve(process.cwd(), '.state.json'), toDataify(getState()));
      ctx.response = {
        data: Date.now(),
      };
    },
  },
  '/api/weekly-range': {
    query: {
      dateTime: {
        type: 'number',
      },
    },
    get: async (ctx) => {
      const list = await getWeeklyRangeOfDateTime(ctx.request.query.dateTime ?? Date.now());
      ctx.response = {
        data: list,
      };
    },
  },
  ...compenstationDay,
  ...holiday,
  ...dateMarker,
};

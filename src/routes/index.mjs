import fs from 'node:fs';
import path from 'node:path';

import { toDataify } from '@quanxiaoxiao/node-utils';

import { getState } from '../store/store.mjs';
import compenstationDay from './compenstationDay/index.mjs';
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
  ...compenstationDay,
  ...holiday,
};

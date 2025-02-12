import './store/store.mjs';

import net from 'node:net';
import process from 'node:process';
import tls from 'node:tls';

import {
  createHttpRequestHandler,
  generateRouteMatchList,
  handleSocketRequest,
} from '@quanxiaoxiao/httttp';

import connectMongo from './connectMongo.mjs';
import logger from './logger.mjs';
import routes from './routes/index.mjs';
import { selectRouteMatchList } from './store/selector.mjs';
import { dispatch,getState } from './store/store.mjs'; // eslint-disable-line

process.nextTick(async () => {
  await connectMongo();
  dispatch('routeMatcheList', generateRouteMatchList(routes));

  const state = getState();

  const handler = (socket) => handleSocketRequest({
    socket,
    ...createHttpRequestHandler({
      list: selectRouteMatchList(),
      logger,
    }),
  });

  if (state.tls && state.tls.cert && state.tls.key) {
    const server = tls.createServer(
      {
        cert: getState().tls.cert,
        key: getState().tls.key,
        minVersion: 'TLSv1',
      },
      handler,
    );

    const { port } = getState().server;

    server.listen(port, () => {
      console.log(`https server listen at \`${port}\``);
    });
  } else {
    const server = net.createServer(handler);

    const { port } = getState().server;

    server.listen(port, () => {
      console.log(`http server listen at \`${port}\``);
    });
  }

});

process.on('uncaughtException', (error) => {
  console.error('------- boooooooom --------');
  console.error(error);
  console.error('------- boooooooom --------');
});

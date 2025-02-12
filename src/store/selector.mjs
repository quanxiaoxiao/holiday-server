import { getState } from './store.mjs';

export const selectRouteMatchList = () => {
  const state = getState();
  const { routeMatcheList } = state;
  return routeMatcheList;
};

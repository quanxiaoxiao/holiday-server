import _ from 'lodash';

import { Todo as TodoModel } from '../../models/index.mjs';

export default async (query = {}) => {
  const q = {
    invalid: {
      $ne: true,
    },
    ..._.pick(query, ['status', 'priority']),
  };
  if (query.dateTimeStart != null) {
    q.dateTimeCreate = {
      $gte: query.dateTimeStart,
    };
  }

  if (query.dateTimeEnd != null) {
    q.dateTime = {
      ...q.dateTime || {},
      $lte: query.dateTimeEnd,
    };
  }

  if (q.status != null && Array.isArray(q.status)) {
    q.status = {
      $in: q.status,
    };
  }

  if (q.priority != null && Array.isArray(q.priority)) {
    q.priority = {
      $in: q.priority,
    };
  }

  const list = await TodoModel
    .find(q)
    .sort({
      priority: 1,
      dateTimeCreate: 1,
    })
    .lean();

  return list;
};

import dayjs from 'dayjs';
import createError from 'http-errors';

import logger from '../../logger.mjs';
import { Todo as TodoModel } from '../../models/index.mjs';

export default async (input) => {
  const data = {
    ...input,
  };
  if (dayjs().startOf('day').isAfter(data.dateTime, 'day')) {
    throw createError(403);
  }
  const todoItem = new TodoModel({
    ...data,
  });

  await todoItem.save();

  logger.warn(`\`createTodo\` \`${JSON.stringify(data)}\``);

  return todoItem;
};

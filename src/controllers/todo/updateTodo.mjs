import createError from 'http-errors';

import logger from '../../logger.mjs';
import { Todo as TodoModel } from '../../models/index.mjs';

export default async (todoItem, input) => {
  if (Object.hasOwnProperty.call(input, 'dateTime')
    || Object.hasOwnProperty.call(input, 'value')
  ) {
    throw createError(403);
  }
  const data = {
    ...input,
  };
  const todoItemNext = await TodoModel.findOneAndUpdate(
    {
      _id: todoItem._id,
      invalid: {
        $ne: true,
      },
    },
    {
      $set: {
        ...data,
        dateTimeUpdate: Date.now,
      },
    },
    {
      new: true,
    },
  );

  logger.warn(`\`updateTodo:${todoItem._id}\` \`${JSON.stringify(input)}\``);

  return todoItemNext;
};

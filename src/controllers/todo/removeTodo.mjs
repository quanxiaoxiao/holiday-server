import { Todo as TodoModel } from '../../models/index.mjs';
import logger from '../logger.mjs';

export default async (todoItem) => {
  await TodoModel
    .updateOne(
      {
        _id: todoItem._id,
        invalid: {
          $ne: true,
        },
      },
      {
        $set: {
          invalid: true,
          dateTimeInvalid: Date.now(),
        },
      },
    );

  logger.warn(`\`removeTodo:${todoItem._id}\``);
};

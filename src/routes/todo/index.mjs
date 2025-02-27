import {
  TODO_PRIORITY_HIGH,
  TODO_PRIORITY_LOW,
  TODO_PRIORITY_MEDIUM,
  TODO_STATUS_COMPLETED,
  TODO_STATUS_IN_PROGRESS,
  TODO_STATUS_PENDING,
} from '../../constants.mjs';
import createTodo from '../../controllers/todo/createTodo.mjs';
import getTodos from '../../controllers/todo/getTodos.mjs';

export default {
  '/api/todos': {
    get: async (ctx) => {
      const todoList = await getTodos({});

      ctx.response = {
        data: todoList,
      };
    },
  },
  '/api/todo': {
    post: {
      validate: {
        type: 'object',
        properties: {
          dateTime: {
            type: 'number',
          },
          value: {
            type: 'string',
            minLength: 1,
            not: {
              pattern: '^\\s+$',
            },
          },
          categories: {
            type: 'array',
            items: {
              type: 'string',
              minLength: 1,
              not: {
                pattern: '^\\s+$',
              },
            },
          },
          description: {
            type: 'string',
            nullable: true,
          },
          status: {
            enum: [
              TODO_STATUS_PENDING,
              TODO_STATUS_IN_PROGRESS,
              TODO_STATUS_COMPLETED,
            ],
          },
          priority: {
            enum: [
              TODO_PRIORITY_HIGH,
              TODO_PRIORITY_LOW,
              TODO_PRIORITY_MEDIUM,
            ],
          },
        },
        required: ['dateTime', 'value'],
        additionalProperties: false,
      },
      fn: async (ctx) => {
        const todoItem = await createTodo(ctx.request.data);
        ctx.response = {
          data: todoItem,
        };
      },
    },
  },
};

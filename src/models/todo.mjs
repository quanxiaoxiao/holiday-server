import mongoose from 'mongoose';

import {
  TODO_PRIORITY_HIGH,
  TODO_PRIORITY_LOW,
  TODO_PRIORITY_MEDIUM,
  TODO_STATUS_COMPLETED,
  TODO_STATUS_IN_PROGRESS,
  TODO_STATUS_PENDING,
} from '../constants.mjs';

const { Schema } = mongoose;

const todoSchema = new Schema({
  dateTime: {
    type: Number,
    required: true,
    index: true,
  },
  dateTimeCreate: {
    type: Number,
    default: Date.now,
  },
  dateTimeUpdate: {
    type: Number,
    default: Date.now,
  },
  value: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: Number,
    enum: [
      TODO_STATUS_PENDING,
      TODO_STATUS_IN_PROGRESS,
      TODO_STATUS_COMPLETED,
    ],
    default: TODO_STATUS_PENDING,
  },
  priority: {
    type: String,
    enum: [
      TODO_PRIORITY_HIGH,
      TODO_PRIORITY_LOW,
      TODO_PRIORITY_MEDIUM,
    ],
    default: TODO_PRIORITY_MEDIUM,
  },
  categories: {
    type: [String],
  },
  invalid: {
    type: Boolean,
    index: true,
    default: false,
  },
  dateTimeInvalid: {
    type: Number,
  },
});

export default todoSchema;

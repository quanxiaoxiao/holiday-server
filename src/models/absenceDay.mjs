import mongoose from 'mongoose';

const { Schema } = mongoose;

const absenceDaySchema = new Schema({
  dateTime: {
    type: Number,
    required: true,
    index: true,
  },
  dateTimeCreate: {
    type: Number,
    default: Date.now,
    index: true,
  },
  dateTimeRanges: [[{ type: Number }]],
  dateTimeUpdate: {
    type: Number,
    default: Date.now,
  },
  description: {
    type: String,
    trim: true,
    default: '',
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

export default absenceDaySchema;

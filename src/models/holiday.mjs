import mongoose from 'mongoose';

const { Schema } = mongoose;

const holidaySchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: '',
  },
  dateTimeStart: {
    type: Number,
    required: true,
  },
  dateTimeEnd: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  dateTimeCreate: {
    type: Number,
    default: Date.now,
  },
});

export default holidaySchema;

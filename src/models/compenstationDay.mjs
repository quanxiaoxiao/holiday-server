import mongoose from 'mongoose';

const { Schema } = mongoose;

const compenstationDaySchema = new Schema({
  dateTime: {
    type: Number,
    required: true,
    unique: true,
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

export default compenstationDaySchema;

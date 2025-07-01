import mongoose from 'mongoose';

const { Schema } = mongoose;

const dateMarkerSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  tag: {
    type: String,
    maxLength: 1,
    trim: true,
  },
  dateTimeCreate: {
    type: Number,
    default: Date.now,
    index: true,
  },
  dateTimeUpdate: {
    type: Number,
    default: Date.now,
  },
  dateTime: {
    type: Number,
    required: true,
    index: true,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
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

export default dateMarkerSchema;

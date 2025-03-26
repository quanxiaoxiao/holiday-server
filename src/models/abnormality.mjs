import mongoose from 'mongoose';

const { Schema } = mongoose;

const abnormalitySchema = new Schema({
  dateTime: {
    type: Number,
    required: true,
  },
  symptom: { // 主要症状，如“头痛、发热”
    type: String,
  },
  severity: { // 严重程度（轻度、中度、重度）
    type: String,
  },
  location: { // 身体部位，如“头部、胃部、关节”
    type: String,
  },
  duration: {
    type: Number,
  },
  triggers: { // 可能的诱因，如“熬夜、饮食不当”
    type: String,
  },
  temperature: {
    type: Number,
  },
  bloodPressure: {
    type: Number,
  },
  moodStatus: { // 记录情绪，如“焦虑、烦躁、抑郁”等
    type: String,
  },
  heartRate: {
    type: Number,
  },
  description: {
    type: String,
  },
  dateTimeCreate: {
    type: Number,
    default: Date.now,
  },
  dateTimeUpdate: {
    type: Number,
    default: Date.now,
  },
});

export default abnormalitySchema;

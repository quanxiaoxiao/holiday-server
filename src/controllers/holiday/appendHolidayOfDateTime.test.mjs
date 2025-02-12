import assert from 'node:assert';
import test, {
  after,
  before,
} from 'node:test';

import dayjs from 'dayjs';
import mongoose from 'mongoose';

import connectMongo from '../../connectMongo.mjs';
import appendHolidayOfDateTime from './appendHolidayOfDateTime.mjs';
import getHolidayOfDateTime from './getHolidayOfDateTime.mjs';
import removeHoliday from './removeHoliday.mjs';

before(async () => {
  await connectMongo();
});

test('appendHolidayOfDateTime', async () => {
  const dateName = '2021-11-11';
  const date = dayjs(dateName, 'YYYY-MM-DD');
  let holidayItem = await getHolidayOfDateTime(date.valueOf());
  if (holidayItem) {
    await removeHoliday(holidayItem);
  }
  let preHolidayItem = await getHolidayOfDateTime(date.clone().subtract(1, 'day').valueOf());
  if (preHolidayItem) {
    await removeHoliday(preHolidayItem);
  }
  let nextHolidayItem = await getHolidayOfDateTime(date.clone().add(1, 'day').valueOf());
  if (nextHolidayItem) {
    await removeHoliday(nextHolidayItem);
  }
  holidayItem = await appendHolidayOfDateTime(date.valueOf());
  assert(holidayItem);
  assert(date.isSame(holidayItem.dateTimeStart, 'day'));
  assert(date.isSame(holidayItem.dateTimeEnd, 'day'));
  preHolidayItem = await getHolidayOfDateTime(date.clone().subtract(1, 'day').valueOf());
  assert(!preHolidayItem);
  nextHolidayItem = await getHolidayOfDateTime(date.clone().add(1, 'day').valueOf());
  assert(!nextHolidayItem);

  preHolidayItem = await appendHolidayOfDateTime(date.clone().subtract(1, 'day').valueOf());
  assert(preHolidayItem);
  assert.equal(holidayItem._id.toString(), preHolidayItem._id.toString());
  preHolidayItem = await getHolidayOfDateTime(date.clone().subtract(1, 'day').valueOf());
  assert.equal(holidayItem._id.toString(), preHolidayItem._id.toString());

  holidayItem = await getHolidayOfDateTime(date.valueOf());

  assert(date.clone().subtract(1, 'day').isSame(holidayItem.dateTimeStart));
  assert(date.isSame(holidayItem.dateTimeEnd));

  nextHolidayItem = await appendHolidayOfDateTime(date.clone().add(1, 'day').valueOf());
  assert(nextHolidayItem);
  assert.equal(holidayItem._id.toString(), nextHolidayItem._id.toString());

  holidayItem = await getHolidayOfDateTime(date.valueOf());
  assert(date.clone().subtract(1, 'day').isSame(holidayItem.dateTimeStart));
  assert(date.clone().add(1, 'day').isSame(holidayItem.dateTimeEnd));

  const nextTo3DayHolidayItem = await appendHolidayOfDateTime(date.clone().add(3, 'day').valueOf());
  assert(nextTo3DayHolidayItem);
  assert(nextTo3DayHolidayItem._id.toString() !== holidayItem._id.toString());
  assert(date.clone().add(3, 'day').isSame(nextTo3DayHolidayItem.dateTimeStart));
  assert(date.clone().add(3, 'day').isSame(nextTo3DayHolidayItem.dateTimeEnd));

  holidayItem = await getHolidayOfDateTime(date.valueOf());

  assert(date.clone().subtract(1, 'day').isSame(holidayItem.dateTimeStart));
  assert(date.clone().add(1, 'day').isSame(holidayItem.dateTimeEnd));

  const nextTo2DayHolidayItem = await appendHolidayOfDateTime(date.clone().add(2, 'day').valueOf());

  assert.equal(holidayItem._id.toString(), nextTo2DayHolidayItem._id.toString());

  const holidayItem2 = await getHolidayOfDateTime(date.valueOf());

  assert.equal(holidayItem._id.toString(), holidayItem2._id.toString());

  assert(date.clone().subtract(1, 'day').isSame(holidayItem2.dateTimeStart));
  assert(date.clone().add(3, 'day').isSame(holidayItem2.dateTimeEnd));

  await removeHoliday(holidayItem2);
  preHolidayItem = await getHolidayOfDateTime(date.clone().subtract(1, 'day').valueOf());
  assert(!preHolidayItem);
  nextHolidayItem = await getHolidayOfDateTime(date.clone().add(1, 'day').valueOf());
  assert(!nextHolidayItem);
});

after(async () => {
  await mongoose.connection.close();
});

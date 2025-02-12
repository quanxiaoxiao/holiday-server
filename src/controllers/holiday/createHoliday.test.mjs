import assert from 'node:assert';
import test, {
  after,
  before,
} from 'node:test';

import dayjs from 'dayjs';
import mongoose from 'mongoose';

import connectMongo from '../../connectMongo.mjs';
import createHoliday from './createHoliday.mjs';
import getHolidayOfDateTime from './getHolidayOfDateTime.mjs';
import removeHoliday from './removeHoliday.mjs';

before(async () => {
  await connectMongo();
});

test('createHoliday', async () => {
  try {
    await createHoliday({
      dateTimeStart: dayjs('2021-05-11', 'YYYY-MM-DD').startOf('day').valueOf(),
      dateTimeEnd: dayjs('2021-05-09', 'YYYY-MM-DD').startOf('day').valueOf(),
    });
    assert.fail();
  } catch (error) {
    assert(!(error instanceof assert.AssertionError));
  }
  const dateName = '2021-03-11';
  const date = dayjs(dateName, 'YYYY-MM-DD');
  for (let i = 0; i < 4; i++) {
    const holidayItem = await getHolidayOfDateTime(date.clone().add(i, 'day').valueOf());
    if (holidayItem) {
      await removeHoliday(holidayItem);
    }
  }
  const holidayItem = await createHoliday({
    dateTimeStart: date.valueOf(),
    dateTimeEnd: date.clone().add(3, 'day').valueOf(),
  });
  assert(holidayItem);
  assert(date.isSame(holidayItem.dateTimeStart, 'day'));
  assert(date.clone().add(3, 'day').isSame(holidayItem.dateTimeEnd, 'day'));
  try {
    await createHoliday({
      dateTimeStart: date.valueOf(),
      dateTimeEnd: date.valueOf(),
    });
    assert.fail();
  } catch (error) {
    assert(!(error instanceof assert.AssertionError));
  }
  try {
    await createHoliday({
      dateTimeStart: date.clone().add(3, 'day').valueOf(),
      dateTimeEnd: date.clone().add(3, 'day').valueOf(),
    });
    assert.fail();
  } catch (error) {
    assert(!(error instanceof assert.AssertionError));
  }
  try {
    await createHoliday({
      dateTimeStart: date.clone().add(1, 'day').valueOf(),
      dateTimeEnd: date.clone().add(2, 'day').valueOf(),
    });
    assert.fail();
  } catch (error) {
    assert(!(error instanceof assert.AssertionError));
  }
  try {
    await createHoliday({
      dateTimeStart: date.clone().add(1, 'day').valueOf(),
      dateTimeEnd: date.clone().add(1, 'day').valueOf(),
    });
    assert.fail();
  } catch (error) {
    assert(!(error instanceof assert.AssertionError));
  }
  const holidayItem2 = await createHoliday({
    dateTimeStart: date.clone().add(4, 'day').valueOf(),
    dateTimeEnd: date.clone().add(4, 'day').valueOf(),
  });
  assert(holidayItem2);
  await removeHoliday(holidayItem);
  await removeHoliday(holidayItem2);
});

after(async () => {
  await mongoose.connection.close();
});

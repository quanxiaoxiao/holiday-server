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
import removeHolidayOfDateTime from './removeHolidayOfDateTime.mjs';

before(async () => {
  await connectMongo();
});

test('test', async () => {
  const dateName = '2021-12-11';
  const date = dayjs(dateName, 'YYYY-MM-DD');
  for (let i = 0; i <= 5; i++) {
    const holidayItem = await getHolidayOfDateTime(date.clone().add(i, 'day').valueOf());
    if (holidayItem) {
      await removeHoliday(holidayItem);
    }
  }

  let holidayItem = await createHoliday({
    dateTimeStart: date.valueOf(),
    dateTimeEnd: date.clone().add(5, 'day'),
  });

  {
    const holidayItem2 = await getHolidayOfDateTime(date.clone().add(5, 'day'));
    assert.equal(holidayItem2._id.toString(), holidayItem._id.toString());
  }

  await removeHolidayOfDateTime(date.clone().add(5, 'day'));

  {
    const empty = await getHolidayOfDateTime(date.clone().add(5, 'day'));
    assert.equal(empty, null);
  }

  {
    const holidayItem2 = await getHolidayOfDateTime(date.clone().add(4, 'day'));
    assert.equal(holidayItem2._id.toString(), holidayItem._id.toString());
  }

  holidayItem = await getHolidayOfDateTime(date.clone().add(3, 'day'));

  assert(holidayItem);

  assert(date.clone().add(4, 'day').isSame(holidayItem.dateTimeEnd, 'day'));
  assert(date.isSame(holidayItem.dateTimeStart, 'day'));

  await removeHolidayOfDateTime(date.clone().add(1, 'day'));

  {
    const empty = await getHolidayOfDateTime(date.clone().add(1, 'day'));
    assert.equal(empty, null);
  }

  {
    let holidayItem2 = await getHolidayOfDateTime(date.clone().add(2, 'day'));
    assert(holidayItem._id.toString() !== holidayItem2._id.toString());
    assert(date.clone().add(4, 'day').isSame(holidayItem2.dateTimeEnd, 'day'));
    assert(date.clone().add(2, 'day').isSame(holidayItem2.dateTimeStart, 'day'));

    await removeHolidayOfDateTime(date.clone().add(2, 'day'));
    let empty = await getHolidayOfDateTime(date.clone().add(2, 'day'));
    assert.equal(empty, null);
    holidayItem2 = await getHolidayOfDateTime(date.clone().add(3, 'day'));
    assert(date.clone().add(3, 'day').isSame(holidayItem2.dateTimeStart, 'day'));
    assert(date.clone().add(4, 'day').isSame(holidayItem2.dateTimeEnd, 'day'));
    await removeHolidayOfDateTime(date.clone().add(3, 'day'));
    await removeHolidayOfDateTime(date.clone().add(4, 'day'));
    empty = await getHolidayOfDateTime(date.clone().add(3, 'day'));
    assert.equal(empty, null);
    empty = await getHolidayOfDateTime(date.clone().add(4, 'day'));
    assert.equal(empty, null);
  }

  {
    const holidayItem2 = await getHolidayOfDateTime(date.valueOf());
    assert(holidayItem._id.toString() === holidayItem2._id.toString());
    assert(date.isSame(holidayItem2.dateTimeEnd, 'day'));
    assert(date.isSame(holidayItem2.dateTimeEnd, 'day'));
    await removeHoliday(holidayItem2);
  }
  const empty = await getHolidayOfDateTime(date.valueOf());
  assert.equal(empty, null);

});

after(async () => {
  await mongoose.connection.close();
});

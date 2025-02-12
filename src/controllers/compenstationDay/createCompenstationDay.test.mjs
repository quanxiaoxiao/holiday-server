import assert from 'node:assert';
import test, {
  after,
  before,
} from 'node:test';

import dayjs from 'dayjs';
import mongoose from 'mongoose';

import connectMongo from '../../connectMongo.mjs';
import createCompenstationDay from './createCompenstationDay.mjs';
import getCompenstationDays from './getCompenstationDays.mjs';
import removeCompenstationDay from './removeCompenstationDay.mjs';

before(async () => {
  await connectMongo();
});

test('createCompenstationDay', async () => {
  const compenstationDayList = await getCompenstationDays();
  assert(compenstationDayList.every((d) => {
    const weekValue = dayjs(d.dateTime).day();
    return weekValue === 0 || weekValue === 6;
  }));
  try {
    await createCompenstationDay(dayjs('2022-03-01', 'YYYY-MM-DD').startOf('week').add(1, 'day').valueOf());
    assert.fail();
  } catch (error) {
    assert(!(error instanceof assert.AssertionError));
  }
  let date = dayjs('2022-11-01').endOf('week');
  const compenstationDayItem = compenstationDayList.find((d) => {
    return date.isSame(d.dateTime, 'day');
  });
  if (compenstationDayItem) {
    await removeCompenstationDay(compenstationDayItem);
  }
  let ret = await createCompenstationDay(date.valueOf());
  assert(ret);
  assert(date.isSame(ret.dateTime, 'day'));
  try {
    await createCompenstationDay(date.valueOf());
    assert.fail();
  } catch (error) {
    assert(!(error instanceof assert.AssertionError));
  }
  await removeCompenstationDay(ret._id);
  ret = await createCompenstationDay(date.valueOf());
  assert(date.isSame(ret.dateTime, 'day'));
  await removeCompenstationDay(ret._id);
  date = date.clone().add(1, 'day');
  assert.equal(date.day(), 0);
  ret = await createCompenstationDay(date.valueOf());
  assert(ret);
  assert(date.isSame(ret.dateTime, 'day'));
  await removeCompenstationDay(ret._id);
  for (let i = 1; i <= 5; i++) {
    try {
      await createCompenstationDay(date.add(i, 'day').valueOf());
      assert.fail();
    } catch (error) {
      assert(!(error instanceof assert.AssertionError));
    }
  }
  ret = await createCompenstationDay(date.add(6, 'day').valueOf());
  assert(ret);
  await removeCompenstationDay(ret._id);
  const list = await getCompenstationDays();
  assert.equal(list.length, compenstationDayList.length);
});

after(async () => {
  await mongoose.connection.close();
});

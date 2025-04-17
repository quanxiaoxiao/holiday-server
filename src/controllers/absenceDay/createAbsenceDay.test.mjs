import assert from 'node:assert';
import test, {
  after,
  before,
} from 'node:test';

import dayjs from 'dayjs';
import mongoose from 'mongoose';

import connectMongo from '../../connectMongo.mjs';
import createAbsenceDay from './createAbsenceDay.mjs';
import removeAbsenceDay from './removeAbsenceDay.mjs';

before(async () => {
  await connectMongo();
});

test('createAbsenceDay', async () => {
  try {
    await createAbsenceDay({
      dateTimeRanges: [
        [
          dayjs().startOf('day').add(2, 'hour').valueOf(),
          dayjs().startOf('day').valueOf(),
        ],
      ],
    });
    assert.fail();
  } catch (error) {
    assert.equal(error.statusCode, 400);
    assert(!(error instanceof assert.AssertionError));
  }

  try {
    await createAbsenceDay({
      dateTimeRanges: [
        [
          dayjs().startOf('day').valueOf(),
          dayjs().startOf('day').add(2, 'day').valueOf(),
        ],
      ],
    });
    assert.fail();
  } catch (error) {
    assert(!(error instanceof assert.AssertionError));
    assert.equal(error.statusCode, 400);
  }

  try {
    await createAbsenceDay({
      dateTime: Date.now(),
      dateTimeRanges: [
        [
          dayjs().startOf('day').add(2, 'day').valueOf(),
          dayjs().startOf('day').add(2, 'day').add(2, 'hour').valueOf(),
        ],
      ],
    });
    assert.fail();
  } catch (error) {
    assert(!(error instanceof assert.AssertionError));
    assert.equal(error.statusCode, 400);
  }
  const dateName = '2025-05-05';
  let absenceDayItem = await createAbsenceDay({
    dateTime: dayjs(dateName, 'YYYY-MM-DD').valueOf(),
  });
  assert.equal(dayjs(absenceDayItem.dateTime).format('YYYY-MM-DD'), dateName);
  assert.deepEqual(absenceDayItem.dateTimeRanges, []);
  try {
    await createAbsenceDay({
      dateTime: dayjs(dateName, 'YYYY-MM-DD').valueOf(),
    });
    assert.fail();
  } catch (error) {
    assert(!(error instanceof assert.AssertionError));
    assert.equal(error.statusCode, 403);
  }
  try {
    await createAbsenceDay({
      dateTimeRanges: [
        [
          dayjs(dateName, 'YYYY-MM-DD').startOf('day').valueOf(),
          dayjs(dateName, 'YYYY-MM-DD').startOf('day').add(2, 'hour').valueOf(),
        ],
      ],
    });
    assert.fail();
  } catch (error) {
    assert(!(error instanceof assert.AssertionError));
    assert.equal(error.statusCode, 403);
  }
  await removeAbsenceDay(absenceDayItem);
  absenceDayItem = await createAbsenceDay({
    dateTimeRanges: [
      [
        dayjs(dateName, 'YYYY-MM-DD').startOf('day').valueOf(),
        dayjs(dateName, 'YYYY-MM-DD').startOf('day').add(2, 'hour').valueOf(),
      ],
    ],
  });
  assert.equal(dayjs(absenceDayItem.dateTime).format('YYYY-MM-DD'), dateName);
  assert.deepEqual(absenceDayItem.dateTimeRanges, [[
    dayjs(dateName, 'YYYY-MM-DD').startOf('day').valueOf(),
    dayjs(dateName, 'YYYY-MM-DD').startOf('day').add(2, 'hour').valueOf(),
  ]]);
  await removeAbsenceDay(absenceDayItem);
});

after(async () => {
  await mongoose.connection.close();
});

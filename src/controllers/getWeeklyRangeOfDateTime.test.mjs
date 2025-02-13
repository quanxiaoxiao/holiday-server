import assert from 'node:assert';
import test, {
  after,
  before,
} from 'node:test';

import dayjs from 'dayjs';
import mongoose from 'mongoose';

import connectMongo from '../connectMongo.mjs';
import getWeeklyRangeOfDateTime from './getWeeklyRangeOfDateTime.mjs';

before(async () => {
  await connectMongo();
});

test('getWeeklyRangeOfDateTime', async () => {
  let ret = await getWeeklyRangeOfDateTime(dayjs('2024-12-23', 'YYYY-MM-DD').valueOf());
  assert.deepEqual(
    ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
    [
      { isWorkDay: true, name: '2024-12-23' },
      { isWorkDay: true, name: '2024-12-24' },
      { isWorkDay: true, name: '2024-12-25' },
      { isWorkDay: true, name: '2024-12-26' },
      { isWorkDay: true, name: '2024-12-27' },
      { isWorkDay: false, name: '2024-12-28' },
      { isWorkDay: false, name: '2024-12-29' },
    ],
  );
  ret = await getWeeklyRangeOfDateTime(dayjs('2024-12-24', 'YYYY-MM-DD').valueOf());
  assert.deepEqual(
    ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
    [
      { isWorkDay: true, name: '2024-12-23' },
      { isWorkDay: true, name: '2024-12-24' },
      { isWorkDay: true, name: '2024-12-25' },
      { isWorkDay: true, name: '2024-12-26' },
      { isWorkDay: true, name: '2024-12-27' },
      { isWorkDay: false, name: '2024-12-28' },
      { isWorkDay: false, name: '2024-12-29' },
    ],
  );
  ret = await getWeeklyRangeOfDateTime(dayjs('2024-12-28', 'YYYY-MM-DD').valueOf());
  assert.deepEqual(
    ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
    [
      { isWorkDay: true, name: '2024-12-23' },
      { isWorkDay: true, name: '2024-12-24' },
      { isWorkDay: true, name: '2024-12-25' },
      { isWorkDay: true, name: '2024-12-26' },
      { isWorkDay: true, name: '2024-12-27' },
      { isWorkDay: false, name: '2024-12-28' },
      { isWorkDay: false, name: '2024-12-29' },
    ],
  );
  ret = await getWeeklyRangeOfDateTime(dayjs('2024-12-29', 'YYYY-MM-DD').valueOf());
  assert.deepEqual(
    ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
    [
      { isWorkDay: true, name: '2024-12-23' },
      { isWorkDay: true, name: '2024-12-24' },
      { isWorkDay: true, name: '2024-12-25' },
      { isWorkDay: true, name: '2024-12-26' },
      { isWorkDay: true, name: '2024-12-27' },
      { isWorkDay: false, name: '2024-12-28' },
      { isWorkDay: false, name: '2024-12-29' },
    ],
  );
  let dayList = [
    { isWorkDay: true, name: '2024-09-09' },
    { isWorkDay: true, name: '2024-09-10' },
    { isWorkDay: true, name: '2024-09-11' },
    { isWorkDay: true, name: '2024-09-12' },
    { isWorkDay: true, name: '2024-09-13' },
    { isWorkDay: true, name: '2024-09-14' },
    { isWorkDay: false, name: '2024-09-15' },
    { isWorkDay: false, name: '2024-09-16' },
    { isWorkDay: false, name: '2024-09-17' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isWorkDay: true, name: '2024-09-02' },
    { isWorkDay: true, name: '2024-09-03' },
    { isWorkDay: true, name: '2024-09-04' },
    { isWorkDay: true, name: '2024-09-05' },
    { isWorkDay: true, name: '2024-09-06' },
    { isWorkDay: false, name: '2024-09-07' },
    { isWorkDay: false, name: '2024-09-08' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isWorkDay: true, name: '2024-09-23' },
    { isWorkDay: true, name: '2024-09-24' },
    { isWorkDay: true, name: '2024-09-25' },
    { isWorkDay: true, name: '2024-09-26' },
    { isWorkDay: true, name: '2024-09-27' },
    { isWorkDay: false, name: '2024-09-28' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isWorkDay: true, name: '2024-09-29' },
    { isWorkDay: true, name: '2024-09-30' },
    { isWorkDay: false, name: '2024-10-01' },
    { isWorkDay: false, name: '2024-10-02' },
    { isWorkDay: false, name: '2024-10-03' },
    { isWorkDay: false, name: '2024-10-04' },
    { isWorkDay: false, name: '2024-10-05' },
    { isWorkDay: false, name: '2024-10-06' },
    { isWorkDay: false, name: '2024-10-07' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isWorkDay: true, name: '2024-10-08' },
    { isWorkDay: true, name: '2024-10-09' },
    { isWorkDay: true, name: '2024-10-10' },
    { isWorkDay: true, name: '2024-10-11' },
    { isWorkDay: true, name: '2024-10-12' },
    { isWorkDay: false, name: '2024-10-13' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isWorkDay: true, name: '2024-04-28' },
    { isWorkDay: true, name: '2024-04-29' },
    { isWorkDay: true, name: '2024-04-30' },
    { isWorkDay: false, name: '2024-05-01' },
    { isWorkDay: false, name: '2024-05-02' },
    { isWorkDay: false, name: '2024-05-03' },
    { isWorkDay: false, name: '2024-05-04' },
    { isWorkDay: false, name: '2024-05-05' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isWorkDay: true, name: '2024-05-06' },
    { isWorkDay: true, name: '2024-05-07' },
    { isWorkDay: true, name: '2024-05-08' },
    { isWorkDay: true, name: '2024-05-09' },
    { isWorkDay: true, name: '2024-05-10' },
    { isWorkDay: true, name: '2024-05-11' },
    { isWorkDay: false, name: '2024-05-12' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isWorkDay: true, name: '2024-01-02' },
    { isWorkDay: true, name: '2024-01-03' },
    { isWorkDay: true, name: '2024-01-04' },
    { isWorkDay: true, name: '2024-01-05' },
    { isWorkDay: false, name: '2024-01-06' },
    { isWorkDay: false, name: '2024-01-07' },
  ];

  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isWorkDay: true, name: '2024-12-30' },
    { isWorkDay: true, name: '2024-12-31' },
    { isWorkDay: false, name: '2025-01-01' },
    { isWorkDay: true, name: '2025-01-02' },
    { isWorkDay: true, name: '2025-01-03' },
    { isWorkDay: false, name: '2025-01-04' },
    { isWorkDay: false, name: '2025-01-05' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isWorkDay: true, name: '2024-04-22' },
    { isWorkDay: true, name: '2024-04-23' },
    { isWorkDay: true, name: '2024-04-24' },
    { isWorkDay: true, name: '2024-04-25' },
    { isWorkDay: true, name: '2024-04-26' },
    { isWorkDay: false, name: '2024-04-27' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isWorkDay: true, name: '2024-06-03' },
    { isWorkDay: true, name: '2024-06-04' },
    { isWorkDay: true, name: '2024-06-05' },
    { isWorkDay: true, name: '2024-06-06' },
    { isWorkDay: true, name: '2024-06-07' },
    { isWorkDay: false, name: '2024-06-08' },
    { isWorkDay: false, name: '2024-06-09' },
    { isWorkDay: false, name: '2024-06-10' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
      dayList,
    );
  }

  dayList = [
    { isWorkDay: true, name: '2025-01-20' },
    { isWorkDay: true, name: '2025-01-21' },
    { isWorkDay: true, name: '2025-01-22' },
    { isWorkDay: true, name: '2025-01-23' },
    { isWorkDay: true, name: '2025-01-24' },
    { isWorkDay: true, name: '2025-01-25' },
    { isWorkDay: true, name: '2025-01-26' },
    { isWorkDay: false, name: '2025-01-27' },
    { isWorkDay: false, name: '2025-01-28' },
    { isWorkDay: false, name: '2025-01-29' },
    { isWorkDay: false, name: '2025-01-30' },
    { isWorkDay: false, name: '2025-01-31' },
    { isWorkDay: false, name: '2025-02-01' },
    { isWorkDay: false, name: '2025-02-02' },
    { isWorkDay: false, name: '2025-02-03' },
    { isWorkDay: false, name: '2025-02-04' },
    { isWorkDay: false, name: '2025-02-05' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isWorkDay: d.isWorkDay, name: d.name })),
      dayList,
    );
  }
});

test('getWeeklyRangeOfDateTime2', () => {
  const dateStart = dayjs('2023-04-01', 'YYYY-MM-DD');
  const dateEnd = dayjs('2026-01-15', 'YYYY-MM-DD');
});

after(async () => {
  await mongoose.connection.close();
});

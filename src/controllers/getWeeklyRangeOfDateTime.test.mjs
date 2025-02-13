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

test('test', async () => {
  let ret = await getWeeklyRangeOfDateTime(dayjs('2024-12-23', 'YYYY-MM-DD').valueOf());
  assert.deepEqual(
    ret.map((d) => ({ isHoliday: !d.isWorkDay, name: d.name })),
    [
      { isHoliday: false, name: '2024-12-23' },
      { isHoliday: false, name: '2024-12-24' },
      { isHoliday: false, name: '2024-12-25' },
      { isHoliday: false, name: '2024-12-26' },
      { isHoliday: false, name: '2024-12-27' },
      { isHoliday: true, name: '2024-12-28' },
      { isHoliday: true, name: '2024-12-29' },
    ],
  );
  ret = await getWeeklyRangeOfDateTime(dayjs('2024-12-24', 'YYYY-MM-DD').valueOf());
  assert.deepEqual(
    ret.map((d) => ({ isHoliday: !d.isWorkDay, name: d.name })),
    [
      { isHoliday: false, name: '2024-12-23' },
      { isHoliday: false, name: '2024-12-24' },
      { isHoliday: false, name: '2024-12-25' },
      { isHoliday: false, name: '2024-12-26' },
      { isHoliday: false, name: '2024-12-27' },
      { isHoliday: true, name: '2024-12-28' },
      { isHoliday: true, name: '2024-12-29' },
    ],
  );
  ret = await getWeeklyRangeOfDateTime(dayjs('2024-12-28', 'YYYY-MM-DD').valueOf());
  assert.deepEqual(
    ret.map((d) => ({ isHoliday: !d.isWorkDay, name: d.name })),
    [
      { isHoliday: false, name: '2024-12-23' },
      { isHoliday: false, name: '2024-12-24' },
      { isHoliday: false, name: '2024-12-25' },
      { isHoliday: false, name: '2024-12-26' },
      { isHoliday: false, name: '2024-12-27' },
      { isHoliday: true, name: '2024-12-28' },
      { isHoliday: true, name: '2024-12-29' },
    ],
  );
  ret = await getWeeklyRangeOfDateTime(dayjs('2024-12-29', 'YYYY-MM-DD').valueOf());
  assert.deepEqual(
    ret.map((d) => ({ isHoliday: !d.isWorkDay, name: d.name })),
    [
      { isHoliday: false, name: '2024-12-23' },
      { isHoliday: false, name: '2024-12-24' },
      { isHoliday: false, name: '2024-12-25' },
      { isHoliday: false, name: '2024-12-26' },
      { isHoliday: false, name: '2024-12-27' },
      { isHoliday: true, name: '2024-12-28' },
      { isHoliday: true, name: '2024-12-29' },
    ],
  );
  let dayList = [
    { isHoliday: false, name: '2024-09-09' },
    { isHoliday: false, name: '2024-09-10' },
    { isHoliday: false, name: '2024-09-11' },
    { isHoliday: false, name: '2024-09-12' },
    { isHoliday: false, name: '2024-09-13' },
    { isHoliday: false, name: '2024-09-14' },
    { isHoliday: true, name: '2024-09-15' },
    { isHoliday: true, name: '2024-09-16' },
    { isHoliday: true, name: '2024-09-17' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isHoliday: !d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isHoliday: false, name: '2024-09-02' },
    { isHoliday: false, name: '2024-09-03' },
    { isHoliday: false, name: '2024-09-04' },
    { isHoliday: false, name: '2024-09-05' },
    { isHoliday: false, name: '2024-09-06' },
    { isHoliday: true, name: '2024-09-07' },
    { isHoliday: true, name: '2024-09-08' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isHoliday: !d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isHoliday: false, name: '2024-09-23' },
    { isHoliday: false, name: '2024-09-24' },
    { isHoliday: false, name: '2024-09-25' },
    { isHoliday: false, name: '2024-09-26' },
    { isHoliday: false, name: '2024-09-27' },
    { isHoliday: true, name: '2024-09-28' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isHoliday: !d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isHoliday: false, name: '2024-09-29' },
    { isHoliday: false, name: '2024-09-30' },
    { isHoliday: true, name: '2024-10-01' },
    { isHoliday: true, name: '2024-10-02' },
    { isHoliday: true, name: '2024-10-03' },
    { isHoliday: true, name: '2024-10-04' },
    { isHoliday: true, name: '2024-10-05' },
    { isHoliday: true, name: '2024-10-06' },
    { isHoliday: true, name: '2024-10-07' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isHoliday: !d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isHoliday: false, name: '2024-10-08' },
    { isHoliday: false, name: '2024-10-09' },
    { isHoliday: false, name: '2024-10-10' },
    { isHoliday: false, name: '2024-10-11' },
    { isHoliday: false, name: '2024-10-12' },
    { isHoliday: true, name: '2024-10-13' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isHoliday: !d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isHoliday: false, name: '2024-04-28' },
    { isHoliday: false, name: '2024-04-29' },
    { isHoliday: false, name: '2024-04-30' },
    { isHoliday: true, name: '2024-05-01' },
    { isHoliday: true, name: '2024-05-02' },
    { isHoliday: true, name: '2024-05-03' },
    { isHoliday: true, name: '2024-05-04' },
    { isHoliday: true, name: '2024-05-05' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isHoliday: !d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isHoliday: false, name: '2024-05-06' },
    { isHoliday: false, name: '2024-05-07' },
    { isHoliday: false, name: '2024-05-08' },
    { isHoliday: false, name: '2024-05-09' },
    { isHoliday: false, name: '2024-05-10' },
    { isHoliday: false, name: '2024-05-11' },
    { isHoliday: true, name: '2024-05-12' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isHoliday: !d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isHoliday: false, name: '2024-01-02' },
    { isHoliday: false, name: '2024-01-03' },
    { isHoliday: false, name: '2024-01-04' },
    { isHoliday: false, name: '2024-01-05' },
    { isHoliday: true, name: '2024-01-06' },
    { isHoliday: true, name: '2024-01-07' },
  ];

  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isHoliday: !d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isHoliday: false, name: '2024-12-30' },
    { isHoliday: false, name: '2024-12-31' },
    { isHoliday: true, name: '2025-01-01' },
    { isHoliday: false, name: '2025-01-02' },
    { isHoliday: false, name: '2025-01-03' },
    { isHoliday: true, name: '2025-01-04' },
    { isHoliday: true, name: '2025-01-05' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isHoliday: !d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isHoliday: false, name: '2024-04-22' },
    { isHoliday: false, name: '2024-04-23' },
    { isHoliday: false, name: '2024-04-24' },
    { isHoliday: false, name: '2024-04-25' },
    { isHoliday: false, name: '2024-04-26' },
    { isHoliday: true, name: '2024-04-27' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isHoliday: !d.isWorkDay, name: d.name })),
      dayList,
    );
  }
  dayList = [
    { isHoliday: false, name: '2024-06-03' },
    { isHoliday: false, name: '2024-06-04' },
    { isHoliday: false, name: '2024-06-05' },
    { isHoliday: false, name: '2024-06-06' },
    { isHoliday: false, name: '2024-06-07' },
    { isHoliday: true, name: '2024-06-08' },
    { isHoliday: true, name: '2024-06-09' },
    { isHoliday: true, name: '2024-06-10' },
  ];
  for (let i = 0; i < dayList.length; i++) {
    ret = await getWeeklyRangeOfDateTime(dayjs(dayList[i].name, 'YYYY-MM-DD').valueOf());
    assert.deepEqual(
      ret.map((d) => ({ isHoliday: !d.isWorkDay, name: d.name })),
      dayList,
    );
  }

});

after(async () => {
  await mongoose.connection.close();
});

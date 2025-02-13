import assert from 'node:assert';
import test from 'node:test';

import dayjs from 'dayjs';
import _ from 'lodash';

import isWorkDay from './isWorkDay.mjs';

test('isWorkDay', () => {
  const dateStart = dayjs();
  const data = [];
  const holidayList = [];
  const compenstationDayList = [];
  for (let i = 0; i < 500; i++) {
    const date = dateStart.add(i, 'day');
    const weekValue = date.day();
    const n = _.random(1, 10);
    const name = date.format('YYYY-MM-DD');
    if (i % n === 0) {
      if (weekValue === 6 || weekValue === 0) {
        compenstationDayList.push(date.valueOf());
        data.push({
          value: date.valueOf(),
          isWorkDay: true,
          name,
        });
      } else {
        holidayList.push(date.valueOf());
        data.push({
          value: date.valueOf(),
          isWorkDay: false,
          name,
        });
      }
    } else {
      data.push({
        value: date.valueOf(),
        isWorkDay: weekValue !== 6 && weekValue !== 0 ? true : false,
        name,
      });
    }
  }
  const is = isWorkDay(holidayList, compenstationDayList);

  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    assert.equal(is(d.value), d.isWorkDay);
  }
});

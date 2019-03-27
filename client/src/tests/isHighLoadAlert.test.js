import { isHighLoadAlert } from '../utils/alertsUtil';
import { highLoadAlerts, noHighLoadAlerts } from './loadAverageStubs';

test('is high load alert', () => {
  expect(isHighLoadAlert(highLoadAlerts)).toBe(true);
});

test('is not high load alert', () => {
  expect(isHighLoadAlert(noHighLoadAlerts)).toBe(false);
});

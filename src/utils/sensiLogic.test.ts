import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePointerSpeed,
  calculateTouchSlop,
  getBrandPresetDetails,
  validateLicenseKey,
  generateCommandList,
  DEFAULT_CONFIG,
  SUPPORTED_GAMES,
} from './sensiLogic.ts';

test('calculatePointerSpeed maps values correctly', () => {
  assert.equal(calculatePointerSpeed(1.0), 0);
  assert.equal(calculatePointerSpeed(5.0), 7);
  assert.equal(calculatePointerSpeed(2.08), 2);
});

test('calculateTouchSlop adjusts based on vertical sensitivity', () => {
  assert.equal(calculateTouchSlop(1.5), 4);
  assert.equal(calculateTouchSlop(2.08), 2);
  assert.equal(calculateTouchSlop(4.0), 1);
});

test('getBrandPresetDetails provides Infinix / Tecno presets', () => {
  const infinix = getBrandPresetDetails('infinix_tecno');
  assert.ok(infinix.name.includes('Infinix / Tecno'));
  assert.ok(infinix.commands.some((c) => c.includes('transsion')));
});

test('validateLicenseKey enforces VIP keyword and strict format', () => {
  const currentDev = 'DEV-PHONE-001';

  // Missing VIP word
  const noVip = validateLicenseKey('SHDX-B70P-KEY', currentDev);
  assert.equal(noVip.isValid, false);
  assert.equal(noVip.message, 'Lisence Key Invalid');

  // Random invalid string
  const randomStr = validateLicenseKey('12345678', currentDev);
  assert.equal(randomStr.isValid, false);
  assert.equal(randomStr.message, 'Lisence Key Invalid');

  // Valid format with VIP: SHDX-B70P-VIP
  const validKey = validateLicenseKey('SHDX-B70P-VIP', currentDev);
  assert.equal(validKey.isValid, true);
  assert.ok(validKey.message.includes('Valid'));
});

test('validateLicenseKey blocks key if already used on another device (1 Key = 1 Device)', () => {
  const currentDev = 'DEV-PHONE-001';
  const otherDev = 'DEV-PHONE-999_OTHER';

  const storedBindings = {
    'SHDX-B70P-VIP': otherDev, // Bound to someone else!
  };

  const attempt = validateLicenseKey('SHDX-B70P-VIP', currentDev, storedBindings);
  assert.equal(attempt.isValid, false);
  assert.equal(attempt.message, 'Lisence Key Invalid');
});

test('SUPPORTED_GAMES lists both Free Fire and Free Fire MAX packages', () => {
  const packages = SUPPORTED_GAMES.map((g) => g.packageName);
  assert.ok(packages.includes('com.dts.freefireth'));
  assert.ok(packages.includes('com.dts.freefiremax'));
});

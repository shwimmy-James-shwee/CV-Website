import { expect, test } from 'vitest';
import { compareIssuingPolicy } from '../MsalClaims';

test('compareIssuingPolicy should return false when idTokenClaims is undefined', () => {
  const result = compareIssuingPolicy(undefined, 'policyName');
  expect(result).toBe(false);
});

test('compareIssuingPolicy should return false when policyToCompare is undefined', () => {
  const result = compareIssuingPolicy({ tfp: 'policyName' }, undefined);
  expect(result).toBe(false);
});

test('compareIssuingPolicy should return false when neither tfp nor acr matches the policyToCompare', () => {
  const result = compareIssuingPolicy({ tfp: 'otherPolicy', acr: 'anotherPolicy' }, 'policyName');
  expect(result).toBe(false);
});

test('compareIssuingPolicy should return true when tfp matches the policyToCompare', () => {
  const result = compareIssuingPolicy({ tfp: 'policyName' }, 'policyName');
  expect(result).toBe(true);
});

test('compareIssuingPolicy should return true when acr matches the policyToCompare', () => {
  const result = compareIssuingPolicy({ acr: 'policyName' }, 'policyName');
  expect(result).toBe(true);
});

test('compareIssuingPolicy should return true when both tfp and acr match the policyToCompare', () => {
  const result = compareIssuingPolicy({ tfp: 'policyName', acr: 'policyName' }, 'policyName');
  expect(result).toBe(true);
});

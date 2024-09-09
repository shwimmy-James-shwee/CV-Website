import { encrypt, decrypt } from './helperFunctions';

describe('helperFunctions', () => {
  it('should return the correct string after encrypt and decrypt', () => {
    const testString = 'test';
    const encrypted = encrypt('key', testString);
    expect(decrypt('key', encrypted)).toEqual(testString);
  });
});

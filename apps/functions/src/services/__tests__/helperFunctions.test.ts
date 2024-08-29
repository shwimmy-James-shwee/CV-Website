import { encrypt, decrypt, removeTempFile } from '../helperFunctions';
import fs from 'fs';

jest.useFakeTimers();

describe('encrypt function', () => {
  it('should encrypt the text using the provided salt', () => {
    // Arrange
    const salt = 'mySalt';
    const text = 'Hello, World!';

    // Act
    const encryptedText = encrypt(salt, text);

    // Assert
    expect(encryptedText).not.toBe(text);
    expect(encryptedText).toMatch(/[0-9a-f]+/); // Check if the encrypted text is a valid hex string
  });
});

describe('decrypt function', () => {
  it('should decrypt the encoded text using the provided salt', () => {
    // Arrange
    const salt = 'mySalt';
    const text = 'Hello, World!';
    const encodedText = encrypt(salt, text); // Encoded version of "Hello, World!"

    // Act
    const decryptedText = decrypt(salt, encodedText);

    // Assert
    expect(decryptedText).toBe(text);
  });
});

describe('removeTempFile function', () => {
  it('should remove the specified file after the specified timeout', () => {
    // Arrange
    const fileNameWithPath = './test-write-file.txt';
    const timeout = 100; // 100 milliseconds

    fs.writeFileSync(fileNameWithPath, 'Hello, World!');
    expect(fs.existsSync(fileNameWithPath)).toBe(true);

    // Act
    removeTempFile(fileNameWithPath, timeout);
    jest.advanceTimersByTime(timeout + 100);
    // Assert
    expect(fs.existsSync(fileNameWithPath)).toBe(false);
  });
});

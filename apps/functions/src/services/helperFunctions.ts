import fs from 'fs';

export const encrypt = (salt: string, text: string) => {
  const textToChars = (textChar: string) => textChar.split('').map((c) => c.charCodeAt(0));
  const byteHex = (n: number) => ('0' + Number(n).toString(16)).slice(-2);
  const applySaltToChar = (code: number) => textToChars(salt).reduce((a: number, b: number) => a ^ b, code);

  return text
    .split('')
    .map((textChar: string) => textChar.charCodeAt(0))
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
};

export const decrypt = (salt: string, encoded: string) => {
  const textToChars = (text: string) => text.split('').map((c) => c.charCodeAt(0));
  const applySaltToChar = (code: number) => textToChars(salt).reduce((a, b) => a ^ b, code);
  if (encoded !== null) {
    return encoded
      .match(/.{1,2}/g)
      ?.map((hex) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join('');
  }
};

export function removeTempFile(fileNameWithPath: string, timeout: number = 60000) {
  setTimeout(() => {
    try {
      fs.unlinkSync(fileNameWithPath);
    } catch (error) {
      /* empty */
    }
  }, timeout);
}

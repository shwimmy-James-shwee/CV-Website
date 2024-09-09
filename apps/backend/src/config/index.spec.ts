import '../config';

describe('Config', () => {
  describe('BigInt toJSON', () => {
    it('should convert BigInt to string', () => {
      const bigIntValue = BigInt(1234567890);
      const jsonString = JSON.stringify({ value: bigIntValue });
      const parsedJson = JSON.parse(jsonString);

      expect(jsonString).toBe(JSON.stringify({ value: '1234567890' }));
      expect(parsedJson.value).toEqual(bigIntValue.toString());
    });
  });
});

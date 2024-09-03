// JSON does not have native support for bigint, however, iat is timestamp bigint.
// int for iat is not an option because the timestamp value will soon pass the limit of int at 2030
Object.defineProperty(BigInt.prototype, 'toJSON', {
  get() {
    'use strict';
    return () => String(this);
  },
});

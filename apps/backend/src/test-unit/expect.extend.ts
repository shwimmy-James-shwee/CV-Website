expect.extend({
  dateIsExpired(received: Date) {
    return { pass: received < new Date(), message: () => 'Date is not expired' };
  },
});

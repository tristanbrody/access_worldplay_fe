const creditCardValidation = creditCardNumber => {
  return !!/\d{15,16}/.test(creditCardNumber.toString());
};

const cvcValidation = () => {};

const expirationValidation = () => {};

const isEmpty = () => {};

module.exports = {
  creditCardValidation,
  cvcValidation,
  expirationValidation,
  isEmpty,
};

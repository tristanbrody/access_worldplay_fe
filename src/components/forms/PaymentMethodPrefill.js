const PaymentMethodPrefill = ({ handleChange }) => {
  return (
    <>
      <label htmlFor="paymentMethodMagicValues">Payment methods</label>
      <select
        name="paymentMethodMagicValues"
        id="paymentMethodMagicValues"
        onChange={handleChange}
      >
        <option value="">--</option>
        <option value="343434343434343">American Express</option>
        <option value="5555555555554444">Cartes Bancaires</option>
        <option value="6011000400000000">Discover/Diners</option>
        <option value="3528000700000000">JCB</option>
        <option value="6759649826438453">Maestro</option>
        <option value="5555555555554444">MasterCard</option>
        <option value="5163613613613613">MasterCard Debit</option>
        <option value="4444333322221111">Visa</option>
        <option value="4462030000000000">Visa Debit</option>
        <option value="4917300800000000">Visa Electron (UK Only)</option>
      </select>
    </>
  );
};

export default PaymentMethodPrefill;

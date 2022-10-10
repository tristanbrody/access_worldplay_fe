const CardholderNamePrefill = ({ handleChange }) => {
  return (
    <>
      <label htmlFor="cardholderNameMagicValues">Cardholder name</label>
      <select
        name="cardholderNameMagicValues"
        id="cardholderNameMagicValues"
        onChange={handleChange}
      >
        <option value="">--</option>
        <option value="AUTHORISED">AUTHORISED</option>
        <option value="ERROR">ERROR</option>
        <option value="REFUSED">REFUSED</option>
        <option value="SOFT_DECLINED">AUTHENTICATION REQUESTED</option>
      </select>
    </>
  );
};

export default CardholderNamePrefill;

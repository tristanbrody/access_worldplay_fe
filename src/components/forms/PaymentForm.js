import { useState, useReducer, useEffect } from "react";
// import formReducer from "../../utils/formReducer";
import classes from "./PaymentForm.module.css";
const axios = require("axios");

const PaymentForm = () => {
  const formReducer = (state, event) => {
    if (event.reset)
      return {
        "credit-card-number": "",
        expiration: "",
      };
    return {
      ...state,
      [event.name]: event.value,
    };
  };

  const [formData, setFormData] = useReducer(formReducer, {});

  const [submittedAuth, setSubmittedAuth] = useState(false);
  const [awaitingAuthResponse, setAwaitingAuthResponse] = useState(true);
  const [authResponse, setAuthResponse] = useState({});

  const handleAuthSubmission = e => {
    e.preventDefault();
    setSubmittedAuth(true);
  };

  useEffect(() => {
    const submitAuth = async () => {
      try {
        //prettier-ignore
        const config = {
          "Content-Type": "application/json"
        }
        const payload = {
          cardNumber: formData["credit-card-number"],
          expiration: formData.expiration,
          cvc: formData.cvc,
          firstName: formData.firstName,
          lastName: formData.lastName,
          usingPreset: false,
        };
        const res = await axios.post(
          "http://localhost:3000/authorization",
          payload,
          config
        );
        setAuthResponse(res);
        setAwaitingAuthResponse(false);
        setFormData({
          reset: true,
        });
      } catch {
        console.log("ERROR");
      }
    };
    if (submittedAuth) submitAuth();
  }, [submittedAuth]);

  const handleChange = e => {
    console.dir(formData);
    console.log(e.target.value);
    setFormData({
      name: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <>
      {submittedAuth && (
        <div>
          Submitting:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}>
                {name}: {value.toString() || ""}
              </li>
            ))}
          </ul>
        </div>
      )}
      {!awaitingAuthResponse && (
        <div>Payment status: {authResponse.data.outcome}</div>
      )}
      <form
        id="auth-form"
        onSubmit={handleAuthSubmission}
        className={classes.authForm}
      >
        <label htmlFor="credit-card-number">Credit Card Number</label>
        <input
          id="credit-card-number"
          onChange={handleChange}
          name="credit-card-number"
          //prettier-ignore
          value={formData["credit-card-number"] || ""}
        />
        <label htmlFor="expiration">Expiration</label>
        <input
          name="expiration"
          id="expiration"
          onChange={handleChange}
          type="number"
          placeholder="mm/yy"
          value={formData.expiration || ""}
        />
        <label htmlFor="cvc">cvc</label>
        <input
          name="cvc"
          id="cvc"
          onChange={handleChange}
          type="number"
          placeholder="cvc"
          value={formData.cvc || ""}
        />
        <label htmlFor="firstName">First name</label>
        <input
          name="firstName"
          id="firstName"
          onChange={handleChange}
          type="text"
          placeholder=""
          value={formData.firstName || ""}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          name="lastName"
          id="lastName"
          onChange={handleChange}
          type="text"
          placeholder=""
          value={formData.lastName || ""}
        />
        <button type="submit" className={classes.submitButton}>
          Submit
        </button>
      </form>
    </>
  );
};

export default PaymentForm;

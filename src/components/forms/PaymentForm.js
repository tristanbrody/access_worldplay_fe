import { useState, useReducer, useEffect } from "react";
import PaymentMethodPrefill from "./PaymentMethodPrefill";
import CardholderNamePrefill from "./CardholderNamePrefill";
// import formReducer from "../../utils/formReducer";
import classes from "./PaymentForm.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const regexFunctions = require("./../../utils/regexValidations");
const axios = require("axios");

const PaymentForm = () => {
  const formReducer = (state, event) => {
    if (event.reset)
      return {
        "credit-card-number": "",
        expiration: "",
        cvc: "",
        firstName: "",
        lastName: "",
        paymentMethodMagicValues: "",
        cardholderNameMagicValues: "",
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
  const [prevFormData, setPrevFormData] = useState({});
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
        const cardNumberValid = regexFunctions.creditCardValidation(
          formData["credit-card-number"]
        );
        if (!cardNumberValid) throw new Error("Credit card number not valid");

        const expirationYear = parseInt(
          `20`.concat(formData.expirationYear.toString())
        );

        const payload = {
          entity: "default",
          cardNumber: formData["credit-card-number"],
          expirationMonth: parseInt(formData.expirationMonth),
          expirationYear,
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
        console.dir(res);
        setAwaitingAuthResponse(false);
        setPrevFormData({ ...formData });
        setFormData({
          reset: true,
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    if (submittedAuth) submitAuth();
  }, [submittedAuth]);

  const handleChange = e => {
    console.dir(formData);
    console.log(e.target.value);

    if (e.target.id === "paymentMethodMagicValues") {
      setFormData({
        name: "credit-card-number",
        value: e.target.value,
      });
    }

    if (e.target.id === "cardholderNameMagicValues") {
      setFormData({
        name: "firstName",
        value: e.target.value,
      });
    }
    setFormData({
      name: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <>
      {submittedAuth &&
        Object.keys(prevFormData).length === 0 &&
        Object.getPrototypeOf(prevFormData) === Object.prototype && (
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
      {submittedAuth && Object.keys(prevFormData).length > 0 && (
        <div>
          Submitting:
          <ul>
            {Object.entries(prevFormData).map(([name, value]) => (
              <li key={name}>
                {name}: {value.toString() || ""}
              </li>
            ))}
          </ul>
        </div>
      )}
      {!awaitingAuthResponse && (
        <>
          <div>New order code created: {authResponse.data.newOrderCode}</div>
          <div>Payment status: {authResponse.data.res.outcome}</div>
        </>
      )}
      <Form id="auth-form" onSubmit={handleAuthSubmission}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="credit-card-number">
            Credit Card Number
          </Form.Label>
          <Form.Control
            type="number"
            id="credit-card-number"
            onChange={handleChange}
            name="credit-card-number"
            //prettier-ignore
            value={formData["credit-card-number"] || formData.paymentMethodPrefill || ""}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="expirationMonth">Expiration</Form.Label>
          <Form.Control
            className="mx-auto"
            style={{ width: "100px" }}
            name="expirationMonth"
            id="expirationMonth"
            onChange={handleChange}
            type="number"
            placeholder="mm"
            value={formData.expirationMonth || ""}
          />
          <Form.Label htmlFor="expirationYear"></Form.Label>
          <Form.Control
            className="mx-auto mb-3"
            style={{ width: "100px" }}
            name="expirationYear"
            id="expirationYear"
            onChange={handleChange}
            type="number"
            placeholder="yy"
            value={formData.expirationYear || ""}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="cvc"
            id="cvc"
            onChange={handleChange}
            type="number"
            placeholder="cvc"
            value={formData.cvc || ""}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control
            name="firstName"
            id="firstName"
            onChange={handleChange}
            type="text"
            placeholder=""
            value={formData.firstName || formData.cardholderNamePrefill || ""}
          />
          <Form.Label>Last name</Form.Label>
          <Form.Control
            className="mb-3"
            name="lastName"
            id="lastName"
            onChange={handleChange}
            type="text"
            placeholder=""
            value={formData.lastName || ""}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <h5>Prefill Magic Values:</h5>
      <PaymentMethodPrefill
        id="paymentMethodPrefill"
        handleChange={handleChange}
      />
      <CardholderNamePrefill
        id="cardholderNamePrefill"
        handleChange={handleChange}
      />
    </>
  );
};

export default PaymentForm;

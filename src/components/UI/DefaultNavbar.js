import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "../pages/Checkout";
import classes from "./DefaultNavbar.module.css";

const DefaultNavbar = () => {
  return (
    <>
      <ul className={classes.navbarUl}>
        <li>
          <a href="http://localhost:3001/checkout">Checkout</a>
        </li>
        <li>
          <a href="http://localhost:3001/checkout">Transactions</a>
        </li>
        <li>
          <a href="http://localhost:3001/checkout">Config</a>
        </li>
      </ul>
      <BrowserRouter>
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/transactions" element={<Checkout />} />
          <Route path="/config" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default DefaultNavbar;

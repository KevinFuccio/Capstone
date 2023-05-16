import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import "./Order.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import ButtonWrapper from "../PayPalComponent/ButtonWrappere";
const Order = () => {
  const [clientToken, setClientToken] = useState(null);
  const currency = "EUR";
  
  const clientId =
    "AXwy2HanA2CEPUmlWjOou2Fq91j3YFWcpFc0WeE1lqJVfwfAvPwWe_5f4wYYLryxywu_-Pfrlhw0jAxy";
  
  return (
    <>
      <div>
        <header>
          <PayPalScriptProvider options={{ "client-id": clientId }}>
            <ButtonWrapper currency={currency} showSpinner={false}/>
          </PayPalScriptProvider>
        </header>
      </div>
    </>
  );
};
export default Order;

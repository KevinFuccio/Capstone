import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import "./Order.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import ButtonWrapper from "../PayPalComponent/ButtonWrappere";
import {
  CART_MODIFY,
  CART_REMOVE,
  TOT_CART,
  foodTypeConverter,
} from "../../Redux/ActionTypes";
import { Products } from "../../Redux/Interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Footer from "../FooterComponent/Footer";
import Navbar from "../NavComponent/Navbar";
const Order = () => {
  const [clientToken, setClientToken] = useState(null);
  const loggedUser = useSelector((state: RootState) => state.user);
  const currency = "EUR";
  const dispatch = useDispatch();

  const clientId =
    "AXwy2HanA2CEPUmlWjOou2Fq91j3YFWcpFc0WeE1lqJVfwfAvPwWe_5f4wYYLryxywu_-Pfrlhw0jAxy";

  const cartSumAmount = () => {
    let singlePrice = 0;

    if (loggedUser.user.cart.productsItems.length > 0) {
      singlePrice = loggedUser.user?.cart.productsItems.reduce(
        (acc, product) => {
          let n = foodTypeConverter(product);

          return acc + product.price * n * product.cartQuantity;
        },
        0
      );
    } else {
      return 0;
    }

    return Number(singlePrice).toFixed(2);
  };
  const cartSumQuantity = () => {
    let totalQty = 0;

    if (loggedUser.user.cart.productsItems.length > 0) {
      totalQty = loggedUser.user?.cart.productsItems.reduce((acc, product) => {
        return acc + product.cartQuantity;
      }, 0);
    } else {
      return totalQty;
    }
    return totalQty;
  };

  const cartAdd = (
    product: Products,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch({
      type: CART_MODIFY,
      payload: { obj: product, optionValue: e.currentTarget.value },
    });
  };

  const cartRemove = (obj: Products) => {
    dispatch({
      type: CART_REMOVE,
      payload: obj,
    });
  };
  const optionQuantity = (el: Products) => {
    return Array.from({ length: el.quantityInStock }, (_, index) => (
      <option key={index + 1} value={index + 1}>
        {index + 1}
      </option>
    ));
  };

  useEffect(() => {
    dispatch({
      type: TOT_CART,
      payload: {
        cartSumAmount: cartSumAmount(),
        cartSumQuantity: cartSumQuantity(),
      },
    });
  }, [cartSumAmount()]);

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
      <div>
        <Navbar/>
        <h2>Riepilogo ordine:</h2>
        <h4 style={{ textAlign: "start" }}>Prodotti:</h4>
        <header>
          <div className="checkout-wrp">
            <div className="checkout">
              {loggedUser.user.cart.productsItems.map((el, i) => (
                <div key={i} className="order-product">
                  <div>
                    <img
                      src={el.image}
                      style={{ height: "100px", width: "92px" }}
                      alt=""
                    />
                    <p className="qty">{el.cartQuantity}</p>
                  </div>
                  <div>
                    <p>{el.name}</p>
                    <p>
                      Pacco:{" "}
                      {el.productCategory.name === "FOOD"
                        ? foodTypeConverter(el) + "/kg"
                        : "x" + foodTypeConverter(el)}{" "}
                    </p>
                    <p>
                      Prezzo:{" "}
                      {(
                        el.price *
                        foodTypeConverter(el) *
                        el.cartQuantity
                      ).toFixed(2)}
                      €
                    </p>
                    <select
                      value={el.cartQuantity}
                      name="options"
                      id="1"
                      onChange={(e) => cartAdd(el, e)}
                    >
                      {optionQuantity(el)}
                    </select>
                  </div>
                  <div className="checkout-btn">
                    <button onClick={() => cartRemove(el)}><FontAwesomeIcon icon={faTrash} color="darkred"></FontAwesomeIcon></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="paypal-box">
              <span>Tot carrello: {cartSumAmount()}€</span>
            <span style={{marginBottom:"10px"}}>paga con:</span>
            <PayPalScriptProvider options={{ "client-id": clientId }}>
              <ButtonWrapper currency={currency} showSpinner={false} />
            </PayPalScriptProvider>
          </div>
        </header>
      </div>
      <Footer/>
    </div>
  );
};
export default Order;

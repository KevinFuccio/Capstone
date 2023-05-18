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
import { CART_MODIFY, CART_REMOVE, TOT_CART } from "../../Redux/ActionTypes";
import { Products } from "../../Redux/Interface";
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
          return acc + product.price * product.cartQuantity;
        },
        0
      );
    } else {
      return 0;
    }

    return Number(singlePrice.toFixed(2));
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
      payload: obj.id,
    });
  };
  const optionQuantity = () => {
    const options = (
      <>
        <option value="10">10/kg</option>
        <option value="20">20/kg</option>
        <option value="30">30/kg</option>
      </>
    );
    return options;
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
    <>
      <div>
        <h2>Riepilogo ordine:</h2>
        <header>
          <div className="checkout-wrp">
            <h4>Prodotti:</h4>
            <div className="checkout">
              {loggedUser.user.cart.productsItems.map((el, i) => (
                <div key={i} className="order-product">
                  <p>{el.name}</p>
                  <img src={el.image} alt="" />
                  <p>{el.price}€/kg</p>
                  <select
                    value={el.cartQuantity}
                    name="options"
                    id="1"
                    onChange={(e) => cartAdd(el, e)}
                  >
                    {optionQuantity()}
                  </select>
                  <p>quantity:{el.cartQuantity}/kg</p>
                  <div className="checkout-btn">
                  <button onClick={() => cartRemove(el)}>Rimuovi</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span>paga con:</span>
            <PayPalScriptProvider options={{ "client-id": clientId }}>
              <ButtonWrapper currency={currency} showSpinner={false} />
            </PayPalScriptProvider>
          </div>
        </header>
      </div>
    </>
  );
};
export default Order;

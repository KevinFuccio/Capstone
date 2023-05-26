import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import Navbar from "../NavComponent/Navbar";
import { Products } from "../../Redux/Interface";
import {
  CART_ADD,
  CART_MODIFY,
  CART_REMOVE,
  TOT_CART,
  foodTypeConverter,
} from "../../Redux/ActionTypes";
import { useEffect, useState } from "react";
import "./Cart.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const loggedUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [change, setChange] = useState(0);

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
  //usare il new Map per filtrare oggetti univoci!!
  const key = "id";

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
  }, [cartSumAmount(), change]);

  return (
    <div>
      <Navbar />
      {loggedUser.user.cart.productsItems.length === 0 ? (
        <div>non ci sono elementi nel carrello!</div>
      ) : (
        <div>elementi nel carrello</div>
      )}
      <div className="cart-items-box">
        {loggedUser?.user.cart.productsItems.map((el, i) => (
          <div key={i} className="cart-items-wrapper">
            <div className="cart-items">
              <div className="cart-item">
                <div style={{ height:"100px" }}>
                  <img
                    src={el.image}
                    alt=""
                    style={{ height: "100px", width: "92px" }}
                  />
                  <p className="qty">{el.cartQuantity}</p>
                </div>
                <div className="cart-item-info">
                  <p>{el.name}</p>
                  <p>
                    Pacco:{" "}
                    {el.productCategory.name === "FOOD"
                      ? foodTypeConverter(el) + "/kg"
                      : "x" + foodTypeConverter(el)}{" "}
                  </p>
                  <select
                    value={el.cartQuantity}
                    name="options"
                    id="1"
                    onChange={(e) => {
                      cartAdd(el, e);
                      setChange(change + 1);
                    }}
                  >
                    {optionQuantity(el)}
                  </select>
                </div>
              <button className="cart-btn" onClick={() => cartRemove(el)}><FontAwesomeIcon icon={faTrash} color="darkred"></FontAwesomeIcon></button>
              </div>
            </div>
          </div>
        ))}
        <div className="order-box">
          <span>Tot carrello: {cartSumAmount()}€</span>
          <div>
            <button className="order-cart-btn"
              disabled={
                loggedUser.user.cart.productsItems.length === 0 ? true : false
              }
              onClick={() => navigate("/order")}
            >
              procedi all'ordine
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;

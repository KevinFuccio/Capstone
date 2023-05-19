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

const Cart = () => {
  const loggedUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[change,setChange] = useState(0);

  const cartSumAmount = () => {
    let singlePrice = 0;

    if (loggedUser.user.cart.productsItems.length > 0) {
      singlePrice = loggedUser.user?.cart.productsItems.reduce(
        (acc, product) => {
          let n = foodTypeConverter(product)

        return acc + (product.price * n) * product.cartQuantity;
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
        return acc + product.cartQuantity
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
  }, [cartSumAmount(),change]);

  return (
    <div>
      <Navbar />
      {loggedUser.user.cart.productsItems.length === 0 ? (
        <div>non ci sono elementi nel carrello!</div>
      ) : (
        <div>elementi nel carrello</div>
      )}

      {loggedUser?.user.cart.productsItems.map((el, i) => (
        <div key={i} className="cart-items">
          <p>{el.name}</p>
          <img src={el.image} alt="" style={{ height: "60px" }} />
          <p>{( el.productCategory.name === "FOOD"? foodTypeConverter(el) +"/kg" :"")}</p>
          <select
            value={el.cartQuantity}
            name="options"
            id="1"
            onChange={(e) => {
              cartAdd(el, e)
              setChange(change+1);
            }}
          >
            {optionQuantity(el)}
          </select>
          <p>quantity:{el.cartQuantity}</p>
          <button onClick={() => cartRemove(el)}>-</button>
        </div>
      ))}
      <span>Tot carrello: {cartSumAmount()}€</span>
      <div>
        <button
          disabled={
            loggedUser.user.cart.productsItems.length === 0 ? true : false
          }
          onClick={() => navigate("/order")}
        >
          procedi all'ordine
        </button>
      </div>
    </div>
  );
};
export default Cart;

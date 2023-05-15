import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import Navbar from "../NavComponent/Navbar";
import { Products } from "../../Redux/Interface";
import { CART_ADD, CART_MODIFY, CART_REMOVE, TOT_CART } from "../../Redux/ActionTypes";
import { useEffect } from "react";
import "./Cart.scss";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const loggedUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const cartSumQuantity = ()=>{
    let totalQty = 0;
    
    if(loggedUser.user.cart.productsItems.length > 0){
        totalQty =  loggedUser.user?.cart.productsItems.reduce((acc,product)=>{
            return acc + product.cartQuantity
        },0)
    }else{
        return totalQty
    }
    return totalQty;
  }
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
      payload: obj.id,
    });
  };
  const optionQuantity = (product:Products) => {
    const options = Array.from(
      { length: product.quantityInStock },
      (_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      )
    );
    return options;
  };
  
  useEffect(()=>{
    dispatch({
      type:TOT_CART,
      payload: {cartSumAmount:cartSumAmount(),cartSumQuantity:cartSumQuantity()}
    })
  },[cartSumAmount()])

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
          <p>{el.price}€/kg</p>
          <select value={el.cartQuantity} name="options" id="1" onChange={(e)=>cartAdd(el,e) }>
            {optionQuantity(el)}
          </select>
          <p>quantity:{el.cartQuantity}</p>
          <button onClick={() => cartRemove(el)}>-</button>
        </div>
      ))}
      <span>Tot carrello: {cartSumAmount()}€</span>
      <div>
        <button disabled={loggedUser.user.cart.productsItems.length === 0?true:false} onClick={()=>navigate("/order")}>procedi all'ordine</button>
      </div>
    </div>
  );
};
export default Cart;

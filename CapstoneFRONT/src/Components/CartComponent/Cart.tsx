import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import Navbar from "../NavComponent/Navbar";
import { Products } from "../../Redux/Interface";
import { CART_REMOVE } from "../../Redux/ActionTypes";
import { useEffect } from "react";

const Cart = () => {
  const loggedUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  //let set = [...new Set([{me:"ciao"},{me:"ciao"}])];
  
  //const cartCopy = loggedUser.user.cart.filter((value, index, array) => array.indexOf(value) === index);
  // const cartCopy = Object.values(loggedUser.user.cart.reduce(((acc as Products | {}),cur)=>{
  //   acc[cur.id] = cur
  //   return acc
  // },{}))

  //usare il new Map per filtrare oggetti univoci!!
  const key = 'id';
  const filteredCart = [...new Map(loggedUser.user.cart.map(item=>
    [item[key],item]
    )).values()]
  console.log(filteredCart);
  

  const cartRemove = (obj:Products) => {
    
    dispatch({
      type: CART_REMOVE,
      payload: obj.id,
    });
  };
 

  return (
    <div>
      <Navbar />
      <div>elementi nel carrello</div>

      {filteredCart.map((el, i) => (
        <div key={i}>   
          <p>{el.name}</p>
          <img src={el.image} alt="" style={{ height: "60px" }} />
          <p>{el.price}€/kg</p>
          <select id="selector">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <p>quantity:{loggedUser.user.cart.filter(e=> e.id === el.id).length}</p>
          <button onClick={() => cartRemove(el)}>-</button>
        </div>
      ))}
    </div>
  );
};
export default Cart;


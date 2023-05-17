import { useEffect, useState } from "react";
import { CART_ADD, PRODUCTS, fetchProducts } from "../../../Redux/ActionTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import "./MainPageHeader.scss";
import { Products } from "../../../Redux/Interface";

const MainPageHeader = () => {
  const loggedUser = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  const cartAdd = (obj: Products) => {
    dispatch({
      type: CART_ADD,
      payload: obj,
    });
  };

  useEffect(() => {
    (async () => {
      let data = await fetchProducts();
      dispatch({
        type: PRODUCTS,
        payload: data,
      });
    })();
  }, []);
  return (
    <div className="cards">
      {products?.map((el, i) => (
        <div key={i}>
          <p>{el.name}</p>
          <img src={el.image} alt="" style={{ height: "60px" }} />
          <p>{el.price}€/kg</p>
          <button
            onClick={() => cartAdd(el)}
            disabled={!loggedUser.user.username ? true : false}
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
};
export default MainPageHeader;

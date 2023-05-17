import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CART_ADD, fetchProducts, PRODUCTS } from "../../../Redux/ActionTypes";
import { Products } from "../../../Redux/Interface";
import { RootState } from "../../../Redux/Store";
import "./MainPageBody.scss";

const MainPageBody = () => {
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
    <>
      <div className="MainPageBody mo5">
        {products?.map((el, i) => (
          <div className="product-card-wrapper">
            <div className="product-card">
              <div key={i}>
                <img src={el.image} alt="" />
              </div>
            </div>
            <div>
              <p>{el.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default MainPageBody;

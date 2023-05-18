import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CART_ADD, fetchProducts, PRODUCTS } from "../../../Redux/ActionTypes";
import { Products } from "../../../Redux/Interface";
import { RootState } from "../../../Redux/Store";
import "./MainPageBody.scss";
import { Link } from "react-router-dom";

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
  }, [products.length]);
  return (
    <div className="MainPageBody-wrapper">
      <h2>Alcuni prodotti:</h2>
      <div className="MainPageBody mo5">
        {products?.map((el, i) => (
          <div className="product-card-wrapper" key={i}>
            <div className="product-card">
              <Link to={`/products/${el.id}`}>
                <div>
                  <img src={el.image} alt="" />
                </div>
              </Link>
            </div>
            <Link to={`/products/${el.id}`}>
              <div>
                <p>{el.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MainPageBody;

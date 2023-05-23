import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateStarRating, CART_ADD, fetchProducts, PRODUCTS } from "../../../Redux/ActionTypes";
import { Products } from "../../../Redux/Interface";
import { RootState } from "../../../Redux/Store";
import "./MainPageBody.scss";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const MainPageBody = ({ typeProduct }: { typeProduct: string }) => {
  const loggedUser = useSelector((state: RootState) => state.user);
  const [products, setProducts] = useState([] as Products[]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let data = await fetchProducts(typeProduct);
      setProducts(data);
    })();
  }, []);
  return (
    <div className="MainPageBody-wrapper">
      <div className="h3Box mo5">
      <h3>sfoglia tutti</h3>
      <Link to={`/products/category/${typeProduct}`}>vedi tutti</Link>
      </div>
      <div className="MainPageBody mo5">
        {products?.slice(0, 4).map((el, i) => (
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
                <Rating initialValue={calculateStarRating(el)?calculateStarRating(el):0} readonly allowFraction size={13} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MainPageBody;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProducts } from "../../../Redux/ActionTypes";
import { RootState } from "../../../Redux/Store";
import { Products } from "../../../Redux/Interface";
import Navbar from "../../NavComponent/Navbar";

const Product = ()=>{
    const loggedUser = useSelector((state: RootState) => state.user);
    const [products, setProducts] = useState([] as Products[]);
    const {category} = useParams();
    const dispatch = useDispatch();
  
    useEffect(() => {
      (async () => {
        let data = await fetchProducts(category as string);
        setProducts(data);
      })();
    }, []);
    return (
      <>
      <Navbar/>
      <div className="MainPageBody-wrapper">
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
      </>
    );
}
export default Product;
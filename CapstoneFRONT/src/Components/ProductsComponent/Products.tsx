import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CART_ADD, CART_MODIFY, getProductById } from "../../Redux/ActionTypes";
import { Products } from "../../Redux/Interface";
import "./Products.scss";
import Navbar from "../NavComponent/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";

const Product = () => {
  const loggedUser = useSelector((state: RootState) => state.user);
  const { id } = useParams();
  const [product, setProduct] = useState({} as Products);
  const dispatch = useDispatch();
  
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
const [selectEvent,setSelectEvent] = useState(optionQuantity().props.children[0].props.value);
  
  const cartmodify = (
    product: Products,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch({
      type: CART_MODIFY,
      payload: { obj: product, optionValue: e.currentTarget.value },
    });
  };
  const cartAdd = (obj: Products, e:string) => {
    dispatch({
      type: CART_ADD,
      payload: obj,
    });
    dispatch({
      type: CART_MODIFY,
      payload: { obj: product, optionValue: e},
    });
    
  };

  useEffect(() => {
    (async () => {
      setProduct(await getProductById(id as string));
    })();
  }, [id]);
  return (
    <div>
      {product.id ? (
        <>
          <Navbar />
          <h2 className="product-name">{product.name}</h2>
          <div className="product-wrapper">
            <div className="pdw-box">
              <img src={product.image} alt="" className="product-image" />
              <div className="pdw">
                <hr />
                <div className="tipologia">
                  Tipologia: {product.productCategory?.name.toLowerCase()}
                </div>
                <hr />
                <div className="product-description">{product.description}</div>
                <div className="product-price">
                  {product.price}
                  <span>€/kg</span>
                </div>
              </div>
            </div>
            <div className="wrp-add-cart">
              <div className="product-price">
                {product.price}
                <span>€/kg</span>
              </div>
              {product.quantityInStock > 0 ? (
                <h5 style={{ color: "green" }}>Disponibili in magazzino</h5>
              ) : (
                <h5 style={{ color: "red" }}>Scorte esaurite</h5>
              )}
              <div className="divSelect">
                quantità:
                <select
                  value={selectEvent}
                  name="options"
                  id="1"
                  onChange={(e) => {cartmodify(product, e)
                     setSelectEvent(e.currentTarget.value)}}
                >
                  {optionQuantity()}
                </select>
                <div className="AddToCartBtn">
                <button
                  onClick={() => cartAdd(product, selectEvent)}
                  disabled={!loggedUser.user.username ? true : false}
                >
                  Aggiungi al carrello
                </button>

                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default Product;

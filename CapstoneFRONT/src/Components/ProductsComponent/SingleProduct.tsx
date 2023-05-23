import { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CART_ADD,
  CART_MODIFY,
  CART_MODIFY_VARIANT,
  calculateStarRating,
  getProductById,
  postComment,
} from "../../Redux/ActionTypes";
import { Products, comment, commmentPost } from "../../Redux/Interface";
import "./SingleProduct.scss";
import Navbar from "../NavComponent/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import RatingStar from "../RatingComponent/RatingStar";
import { Rating } from "react-simple-star-rating";

const SingleProduct = () => {
  const loggedUser = useSelector((state: RootState) => state.user);
  const { id } = useParams();
  const [product, setProduct] = useState({} as Products);
  const [resetRating, setResetRating] = useState(false);
  const dispatch = useDispatch();

  const [comment, setComment] = useState({
    user_id: loggedUser.user.id,
    product_id: product?.id,
    comment: "",
    valutation: 0,
  });

  const handleChange = (e: any) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };
  const handleRating = (rate: number) => {
    setComment({
      ...comment,
      valutation: rate,
    });
  };
  const handleSubmit = async (e: any, obj: commmentPost) => {
    e.preventDefault();
    if (comment.valutation !== 0) {
      await postComment(obj, loggedUser.user);
      setProduct(await getProductById(id as string));
      setComment({
        user_id: loggedUser.user.id,
        product_id: product?.id,
        comment: "",
        valutation: 0,
      });
      setResetRating(true);
    }
  };

  const optionCategory = () => {
    const options = (
      <>
        <option value="S">10/kg</option>
        <option value="M">20/kg</option>
        <option value="L">30/kg</option>
      </>
    );
    return options;
  };
  const optionCategory2 = () => {
    const options = (
      <>
        <option value="S">1</option>
        <option value="M">x5</option>
        <option value="L">x10</option>
      </>
    );
    return options;
  };
  
  
  

  const options =
    product.productCategory?.name === "FOOD"
      ? optionCategory()
      : optionCategory2();
  const optionQuantity = () => {
    return Array.from({ length: product.quantityInStock }, (_, index) => (
      <option key={index + 1} value={index + 1}>
        {index + 1}
      </option>
    ));
  };

  const [selectEvent, setSelectEvent] = useState(
    options?.props.children[0].props.value
  );

  const [selectQuantity, setSelectQuantity] = useState(
    optionQuantity().length > 0
      ? optionQuantity()[0].props.value.toString()
      : "1"
  );

  const cartAdd = (obj: Products, e: string, qty: string) => {
    let variant;
    switch (e) {
      case "S":
        variant = { id: 1, variant: e };
        break;
      case "M":
        variant = { id: 2, variant: e };
        break;
      case "L":
        variant = { id: 3, variant: e };
        break;
      default:
        return;
    }
    console.log(obj, e, qty);

    const object1 = {
      ...obj,
      productVariant: variant,
    };

    dispatch({
      type: CART_ADD,
      payload: { object1, qty: qty },
    });
  };

  useEffect(() => {
    (async () => {
      setProduct(await getProductById(id as string));
    })();
  }, [id]);

  useEffect(() => {
    if (product.id !== undefined) {
      setComment({
        ...comment,
        product_id: product?.id,
      });
    }
  }, [product]);
  useEffect(() => {
    if (resetRating) {
      setResetRating(false);
    }
  }, [resetRating]);
  return (
    <div>
      {product.id ? (
        <>
          <Navbar />
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", alignItems: "start" }}>
              <h2 className="product-name">{product.name}</h2>
              <p style={{paddingLeft:"10px"}}>
                <Rating initialValue={calculateStarRating(product)?calculateStarRating(product):0} readonly allowFraction size={13} />
              </p>
            </div>
          </div>
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
                  {product.productCategory.name === "FOOD" ? (
                    <span>€/kg</span>
                  ) : (
                    <span>€</span>
                  )}
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
                Taglia:
                <select
                  value={selectEvent}
                  name="options"
                  id="1"
                  onChange={(e) => {
                    setSelectEvent(e.currentTarget.value);
                  }}
                >
                  {options}
                </select>
                quantità:
                <select
                  value={selectQuantity}
                  name="options-quantity"
                  id="2"
                  onChange={(e) => {
                    setSelectQuantity(e.currentTarget.value);
                    console.log(e.currentTarget.value);
                  }}
                >
                  {optionQuantity()}
                </select>
                <div className="AddToCartBtn">
                  <button
                    onClick={() =>
                      cartAdd(product, selectEvent, selectQuantity)
                    }
                    disabled={!loggedUser.user.username ? true : false}
                  >
                    Aggiungi al carrello
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p>commenti:</p>

            <div>
              <h4>Vuoi lasciare un commento su questo prodotto?</h4>
              <form onSubmit={(e) => handleSubmit(e, comment)}>
                <input
                  type="text"
                  name="comment"
                  value={comment.comment}
                  onChange={(e) => handleChange(e)}
                />
                <RatingStar
                  onRatingChange={handleRating}
                  resetRating={resetRating}
                />
                <button>invia</button>
              </form>
            </div>
          </div>
          {product?.comments?.length !== 0 ? (
            <>
              {product?.comments.map((e, i) => (
                <div key={i}>
                  <h5>{e.user.username}</h5>
                  <p>{e.comment}</p>
                  <p>
                    <Rating size={15} readonly initialValue={e.valutation} />
                  </p>
                </div>
              ))}
            </>
          ) : (
            <div>non ci sono commenti</div>
          )}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SingleProduct;

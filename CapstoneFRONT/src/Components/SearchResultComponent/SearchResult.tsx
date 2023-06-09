import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { calculateStarRating, getProductByName } from "../../Redux/ActionTypes";
import Navbar from "../NavComponent/Navbar";
import { Products } from "../../Redux/Interface";
import "./SearchResult.scss";
import { Rating } from "react-simple-star-rating";
import Footer from "../FooterComponent/Footer";

const SearchResult = () => {
  const { search } = useParams();
  const [items, setItems] = useState([] as Products[]);
  useEffect(() => {
    (async () => {
      const data = await getProductByName(search as string);
      setItems(data);
    })();
  }, [search]);
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
      <div>
      <Navbar />
      {items.length !== 0 ? (
        <div className="MainPageBody mo5" style={{marginTop:"20px"}}>
          {items?.map((el, i) => (
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
      ) : (
        <div>
          <p>Non ci sono risultati per {search}</p>
        </div>
      )}
      </div>
      <Footer/>
    </div>
  );
};
export default SearchResult;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductByName } from "../../Redux/ActionTypes";
import Navbar from "../NavComponent/Navbar";
import { Products } from "../../Redux/Interface";
import "./SearchResult.scss";

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
    <>
      <Navbar />
      <div>
        <h3>Elementi trovati: {items.length}</h3>
      </div>
      {items.length !== 0 ? (
        <div className="MainPageBody mo5">
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
    </>
  );
};
export default SearchResult;

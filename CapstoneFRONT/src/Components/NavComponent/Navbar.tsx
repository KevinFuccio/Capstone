import { Link, Navigate, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { USER, getProductByName } from "../../Redux/ActionTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Navbar = () => {
  const loggedUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const totalProducts = [...loggedUser.user.cart.productsItems]
  //console.log(totalProducts);
  const [search, setSearch] = useState("");

  const cartSum = () => {
    let totalQty = 0;

    if (loggedUser.user.cart.productsItems.length > 0) {
      totalQty = loggedUser.user?.cart.productsItems.reduce((acc, product) => {
        return acc + product.cartQuantity;
      }, 0);
    } else {
      return totalQty;
    }
    return totalQty;
  };

  const handleLogout = (e: any) => {
    e.preventDefault();
    navigate("/");
    dispatch({
      type: USER,
      payload: {},
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (search !== "") {
      await getProductByName(search);
      navigate(`/result/${search}`);
    }
  };

  return (
    <div className="">
      <div className="navbar_main">
        <div className="links">
          <Link to={"/"}>Home</Link>
        </div>
        <div className="navbar-form-wrapper">
          <form onSubmit={handleSubmit}>
            <label htmlFor="searchBar"></label>
            <input
              type="text"
              id="searchBar"
              className="search"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <button className="searchBtn">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
        {!loggedUser.user.username ? (
          <div className="login">
            <Link to={"/register"}>
              <button>Registrati</button>
            </Link>
            <Link to={"/login"}>
              <button>Login</button>
            </Link>
          </div>
        ) : (
          <div className="loginDiv">
            <button className="shoppingCart" onClick={() => navigate("/cart")}>
              <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
              <span>{cartSum()}</span>
            </button>
            <Link to={`/profile-Info/`}>{loggedUser.user.username}</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

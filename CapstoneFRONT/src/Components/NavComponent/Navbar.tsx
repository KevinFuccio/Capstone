import { Link, Navigate, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { USER } from "../../Redux/ActionTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const loggedUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const totalProducts = [...loggedUser.user.cart.productsItems]
  //console.log(totalProducts);

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
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="mo5 pv5">
      <div className="navbar_main">
        <div className="links">
          <Link to={"/"}>Home</Link>
          <Link to={"/products"}>Products</Link>
        </div>
        <div className="navbar-form-wrapper">
          <form onSubmit={handleSubmit}>
            <label htmlFor="searchBar"></label>
            <input type="text" id="searchBar" className="search" />
            <button className="searchBtn">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
        {!loggedUser.user.username ? (
          <div className="login">
            <Link to={"/register"}>
              <button>Register</button>
            </Link>
            <Link to={"/login"}>
              <button>Login</button>
            </Link>
          </div>
        ) : (
          <div className="loginDiv">
            <button className="shoppingCart" onClick={() => navigate("/cart")}>
              <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
              {cartSum()}
            </button>
            <div>bentornato {loggedUser.user.username}!</div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import { Link, Navigate, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { USER, getProductByName } from "../../Redux/ActionTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faClose,
  faMagnifyingGlass,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NavDropdown } from "react-bootstrap";

const Navbar = () => {
  const loggedUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const totalProducts = [...loggedUser.user.cart.productsItems]
  //console.log(totalProducts);
  const [search, setSearch] = useState("");
  const [formResponsive, setFormResposive] = useState(false);

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
      <div
        className="navbar_main"
        style={formResponsive ? { justifyContent: "center" } : {}}
      >
        {!formResponsive ? (
          <>
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
          </>
        ) : (
          ""
        )}

        {!loggedUser.user.username ? (
          <div className="login">
            <Link to={"/login"}>
              <button>Accedi</button>
            </Link>
          </div>
        ) : (
          <div className="loginDiv">
            <div className="search-bar">
              <form onSubmit={handleSubmit}>
                {formResponsive ? (
                  <>
                    <span
                      style={{ marginRight: "5px",cursor:"pointer" }}
                      onClick={() => {
                        setFormResposive(false);
                        setSearch("");
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </span>
                    <label htmlFor="searchBar"></label>
                    <input
                      type="text"
                      id="searchBar"
                      className="search"
                      value={search}
                      onChange={(e) => setSearch(e.currentTarget.value)}
                    />
                  </>
                ) : (
                  ""
                )}

                <span
                  className="responsive-form-close"
                  style={
                    !formResponsive
                      ? { display: "none" }
                      : { display: "inline-block" }
                  }
                  onClick={() => setSearch("")}
                >
                  x
                </span>

                <button
                  className="searchBtn responsive-form-close"
                  style={formResponsive ? { display: "inline" } : {}}
                  onClick={() => setFormResposive(true)}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </form>
            </div>
            {!formResponsive ? (
              <>
                <button
                  className="shoppingCart"
                  onClick={() => navigate("/cart")}
                >
                  <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                  <span>{cartSum()}</span>
                </button>
                <NavDropdown
                  title={loggedUser.user.username}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item>
                    <p onClick={()=>navigate("/profile-info/")}>Il tuo account</p>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    <p onClick={handleLogout}>Logout</p>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

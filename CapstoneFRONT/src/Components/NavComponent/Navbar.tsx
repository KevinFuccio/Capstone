import { Link, Navigate, useNavigate } from "react-router-dom";
import "./NavBar.scss"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { USER } from "../../Redux/ActionTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Navbar = () =>{
    const loggedUser = useSelector((state:RootState)=>state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e:any)=>{
        e.preventDefault();
        dispatch({
            type: USER,
            payload:{}
        })
    }
    const handleSubmit = (e:any)=>{
        e.preventDefault();
        
    }
    const navigateToCart = ()=>{
        
    }
return(
    <div>
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="searchBar"></label>
                <input type="text" id="searchBar" className="search"/>
                <button className="searchBtn"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>
        </div>
        <div className="navbar_main">
            <div className="links">
                <Link to={"/"}>Home</Link>
                <Link to={"/products"}>Products</Link>
            </div>
            {!loggedUser.user.username?(
                <div className="login">
                <Link to={"/register"}>
                    <button>Register</button>
                </Link>
                <Link to={"/login"}>
                    <button>Login</button>
                </Link>
           </div>
            ):(
                <div className="loginDiv">
                    <button className="shoppingCart" onClick={()=>navigate("/cart")}><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>{loggedUser.user.cart.length}</button>
                    <div>bentornato {loggedUser.user.username}!</div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            
        </div>
    </div>
)
};

export default Navbar;
import { Link } from "react-router-dom";
import "./NavBar.scss"

const Navbar = () =>{
return(
    <div>
        <div className="navbar_main">
            <div className="links">
                <Link to={"/"}>Home</Link>
                <Link to={"/products"}>Products</Link>
            </div>
            <div className="login">
                <Link to={"/register"}>
                    <button>Register</button>
                </Link>
                <Link to={"/login"}>
                    <button>Login</button>
                </Link>
           </div>
        </div>
    </div>
)
};

export default Navbar;
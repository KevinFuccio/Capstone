import { Link } from "react-router-dom";
import "./NavBar.scss"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { USER } from "../../Redux/ActionTypes";

const Navbar = () =>{
    const loggedUser = useSelector((state:RootState)=>state.user)
    const dispatch = useDispatch();
    const handleSubmit = ()=>{
        dispatch({
            type: USER,
            payload:{}
        })
    }
return(
    <div>
        <div>
            a
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
                <div>
                    <div>bentornato {loggedUser.user.username}!</div>
                    <button onClick={handleSubmit}>logOut</button>
                </div>
            )}
            
        </div>
    </div>
)
};

export default Navbar;
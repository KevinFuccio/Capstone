import "./NavBar.scss"

const Navbar = () =>{
return(
    <div>
        <div className="navbar_main">
            <div className="links">
                <a href="*">Home</a>
                <a href="*">Products</a>
            </div>
            <div className="login">
                <button>Register</button>
                <button>Login</button>
            </div>
        </div>
    </div>
)
};

export default Navbar;
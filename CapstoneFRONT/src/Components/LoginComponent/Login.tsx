import "./Login.scss";
import { useEffect, useRef, useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axio";
import { useDispatch } from "react-redux";
import { USER } from "../../Redux/ActionTypes";
const LOGIN_URL = "/auth/login";

const Login = () => {
  const { setAuth }: any = useContext(AuthContext);
 // const {auth}:any = useContext(AuthContext)
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current?.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(()=>{
    if(success){
        navigate("/")
        setSuccess(false)
    }
  },[success])
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      
      
      dispatch({
        type:USER,
        payload: response.data
      })
      
      
      
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (error:any) {
        setErrMsg(error?.response?.data.message)
        errRef.current?.focus();
    }
  };

  return (
    <div>
      <main>
        <div className="boxLogin">
          
            <section>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>Sign in</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />

                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />

                <button disabled={!user || !pwd ? true : false}>Sign Up</button>
              </form>
              <p>
                Not registered?
                <br />
                <span className="line">
                  <Link to={"/register"}>Sign up</Link>
                </span>
              </p>
            </section>
          
        </div>
      </main>
    </div>
  );
};
export default Login;

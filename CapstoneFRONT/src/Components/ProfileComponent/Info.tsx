import Navbar from "../NavComponent/Navbar";
import img from "../../Package-illustration-Graphics-1-18.jpg";
import userimg from "../../user-placeholder.png";
import "./Info.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../Redux/Store";
import Footer from "../FooterComponent/Footer";

const Info = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    if (!user.username) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="wrap" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
      <div>
        <Navbar />
        <div className="info-wrapper">
          <div className="info">
            <div className="info-btn-wrapper">
              <img src={img} alt="" />
              <button onClick={() => navigate("/profile-Info/orders")}>
                I tuoi ordini
              </button>
            </div>
            <div className="info-btn-wrapper">
              <img src={userimg} alt="" style={{ marginRight: "15px" }} />
              <button onClick={() => navigate(`/profile/${user.username}`)}>
                Modifica il tuo profilo
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
export default Info;

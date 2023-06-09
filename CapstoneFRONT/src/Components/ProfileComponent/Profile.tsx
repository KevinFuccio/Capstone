import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../NavComponent/Navbar";
import "./Profile.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import ProfileModal from "./ProfileModal";
import Footer from "../FooterComponent/Footer";

const Profile = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const { username } = useParams();
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
      <div className="profile-wrapper">
        <div className="profile mo5">
          <div>
          
          </div>
          <div className="mo5 profile-info">
            <div>
              <h4>Nome:</h4>
              <p>{user.username}</p>
            </div>
          </div>
          <div className="mo5 profile-info">
            <div>
              <h4>Email:</h4>
              <p>{user.email}</p>
            </div>
          </div>
          <ProfileModal />
          <button className="profile-btn" onClick={()=> navigate("/")}>Fatto</button>
        </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
};
export default Profile;

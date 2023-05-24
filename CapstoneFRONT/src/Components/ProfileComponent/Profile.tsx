import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../NavComponent/Navbar";
import "./Profile.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import ProfileModal from "./ProfileModal";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    if (!user.username) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="wrap">
      <Navbar />
      <div className="profile-wrapper">
        <div className="profile mo5">
          <div className="mo5 profile-info">
            <div>
              <h4>Nome:</h4>
              <p>{user.username}</p>
            </div>
            <div>
              <ProfileModal/>
            </div>
          </div>
          <div className="mo5 profile-info">
            <div>
              <h4>Email:</h4>
              <p>{user.email}</p>
            </div>
            <div>
              <button>Modifica</button>
            </div>
          </div>
          <div className="mo5 profile-info">
            <div>
              <h4>Password:</h4>
              <p>******</p>
            </div>
            <div>
              <button>Modifica</button>
            </div>
          </div>
          <button>Fatto</button>
        </div>
      </div>
    </div>
  );
};
export default Profile;

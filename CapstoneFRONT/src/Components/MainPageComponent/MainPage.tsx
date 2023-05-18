import { useSelector } from "react-redux";
import Navbar from "../NavComponent/Navbar";
import { RootState } from "../../Redux/Store";
import MainPageHeader from "./MainPageHeaderComponent/MainPageHeader";
import "../MainPageComponent/MainPage.scss"
import MainPageBody from "./MainPageBodyComponent/MainPageBody";

    

const MainPage = ()=>{    
    return(
        <>
        <div className="background-orange">
            <Navbar/>
            <MainPageHeader/>
        </div>
            <MainPageBody/>
        </>
    )
};
export default MainPage;
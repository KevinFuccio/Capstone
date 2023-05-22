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
        <div className="mainBody">
        <h2>Alcuni prodotti:</h2>
            <MainPageBody typeProduct={"FOOD"}/>
            <MainPageBody typeProduct={"CONSERVE"}/>
            <MainPageBody typeProduct={"PLANT"}/>
        </div>
        </>
    )
};
export default MainPage;
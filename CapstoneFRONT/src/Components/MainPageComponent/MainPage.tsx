import { useSelector } from "react-redux";
import Navbar from "../NavComponent/Navbar";
import { RootState } from "../../Redux/Store";
import MainPageHeader from "./MainPageHeaderComponent/MainPageHeader";
import "../MainPageComponent/MainPage.scss"
import MainPageBody from "./MainPageBodyComponent/MainPageBody";

    

const MainPage = ()=>{
    const loggedUser = useSelector((state:RootState)=> state.user)
    
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
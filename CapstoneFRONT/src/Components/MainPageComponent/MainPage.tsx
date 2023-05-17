import { useSelector } from "react-redux";
import Navbar from "../NavComponent/Navbar";
import { RootState } from "../../Redux/Store";
import axio from "../../api/axio";
import MainPageHeader from "./MainPageHeaderComponent/MainPageHeader";

    

const MainPage = ()=>{
    const loggedUser = useSelector((state:RootState)=> state.user)
    
    return(
        <div>
            <Navbar/>
            <MainPageHeader/>
        </div>
    )
};
export default MainPage;
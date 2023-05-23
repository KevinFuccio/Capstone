import { useDispatch, useSelector } from "react-redux";
import Navbar from "../NavComponent/Navbar";
import { RootState } from "../../Redux/Store";
import MainPageHeader from "./MainPageHeaderComponent/MainPageHeader";
import "../MainPageComponent/MainPage.scss"
import MainPageBody from "./MainPageBodyComponent/MainPageBody";
import { useEffect } from "react";
import { PRODUCTS, fetchProductsAll } from "../../Redux/ActionTypes";

    

const MainPage = ()=>{    
    const dispatch = useDispatch();
    useEffect(()=>{
        (async()=>{
            let data = await fetchProductsAll();
            dispatch({
                type:PRODUCTS,
                payload:data
            })
        })()
    },[])
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
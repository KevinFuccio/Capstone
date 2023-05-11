import { useSelector } from "react-redux";
import Navbar from "../NavComponent/Navbar";
import { RootState } from "../../Redux/Store";
import axio from "../../api/axio";

    const PRODUCT_FETCH_ALL="/products/all";

const MainPage = ()=>{
    const loggedUser = useSelector((state:RootState)=> state.user)
    const handleSubmit = async()=>{

        try {
            const response = await axio.get(PRODUCT_FETCH_ALL,
                {
                    headers: {"Authorization":`Bearer ${loggedUser.user.accessToken}`}
                });
            console.log(response.data);
            
        } catch (error) {
            
        }

    }
    return(
        <div>
            <Navbar/>
            {!loggedUser.user.username?(
                <div></div>
                ):(
                <div>
                    <button onClick={handleSubmit}></button>
                </div>
                )
            }
           
        </div>
    )
};
export default MainPage;
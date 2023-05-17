import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../Redux/Store";
import { CART_CLEAR } from "../../Redux/ActionTypes";

const ThankYou = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {name} = useParams();
    console.log(name);
    
    return(
        <div>
            <h2>Thank you for the purchase! {name}</h2>
            <button onClick={()=>{
                navigate("/")
                dispatch({
                    type:CART_CLEAR
                })
                }
            }>go back for more shopping!</button>
        </div>
    )
}
export default ThankYou;
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import Navbar from "../NavComponent/Navbar";

const Cart = ()=>{


    const loggedUser = useSelector((state:RootState)=> state.user)

    const cartRemove = ()=>{

    }
    
    return(
        <div>
            <Navbar/>
            <div>
                elementi nel carrello
            </div>
            {loggedUser.user.cart.map((el,i)=>(
                <div key={i}>
                <p>{el.name}</p>
                <img src={el.image} alt="" style={{height:"60px"}}/>
                <p>{el.price}€/kg</p>
                <button onClick={()=>cartRemove()}>-</button>
            </div>
            ))}
        </div>
    )
}
export default Cart;
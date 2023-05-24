import { useEffect, useState } from "react";
import Navbar from "../NavComponent/Navbar";
import "./Orders.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { getOrders } from "../../Redux/ActionTypes";

const Orders = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const [order,setOrder] = useState();
    useEffect(()=>{
        (async()=>{
            let data = await getOrders(user.id);
            setOrder(data)
        })()
    },[])
  return (
    <div className="wrap">
      <Navbar />
      <div className="order-wrapper">
        <div className="order">
          <div className="order-title">
            <h3>I tuoi ordini:</h3>
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default Orders;

import { useEffect, useState } from "react";
import Navbar from "../NavComponent/Navbar";
import "./Orders.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { ORDER, foodTypeConverter, getOrders } from "../../Redux/ActionTypes";
import { OrderLine, ShoppingOrderList } from "../../Redux/Interface";
import moment from "moment";

const Orders = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const order = useSelector((state: RootState) => state.order.order);
  const dispatch = useDispatch();
  const itemConverter = (OrderLine: OrderLine) => {
    let n = 1;
    if (OrderLine.product.productCategory.name === "FOOD") {
      switch (OrderLine.productVariantProduct) {
        case "S":
          n = 10;
          break;
        case "M":
          n = 20;
          break;
        case "L":
          n = 30;
          break;
        default: {
          return n;
        }
      }
    } else {
      switch (OrderLine.productVariantProduct) {
        case "S":
          n = 1;
          break;
        case "M":
          n = 5;
          break;
        case "L":
          n = 10;
          break;
        default: {
          return n;
        }
      }
    }
    return n;
  };

  useEffect(() => {
    (async () => {
      let data = await getOrders(user.id);
      console.log(data);

      dispatch({
        type: ORDER,
        payload: data,
      });
    })();
  }, [user.id]);
  return (
    <div className="wrap">
      <Navbar />
      <div className="order-wrapper">
        <div className="order">
          <div className="order-title">
            <h3>I tuoi ordini:</h3>
          </div>
          <div>
            {order.map((e, i) => (
              <>
                <div>
                  <p>Ordine id: {e.id}</p>
                  {e.orderLine.map((j, index) => (
                    <div>
                      <div>
                        <p>
                          del: {moment(e.initializedOrder).format("DD-MM-YYYY")}
                        </p>
                      </div>
                      <div>
                        <p>{j.product.name}</p>
                        <img src={j.product.image} alt="" />
                        <p>prezzo:{j.price}</p>
                        <p>Quantità prodotto{j.quantity}</p>
                        <p>Pacco:{j.product.productCategory.name==="FOOD"?itemConverter(j)+"/kg":"x"+itemConverter(j)}</p>
                      </div>
                    </div>
                  ))}
                  <p>Totale ordine:{e.totalPrice}</p>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Orders;

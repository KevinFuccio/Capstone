import { useEffect } from "react";
import Navbar from "../NavComponent/Navbar";
import "./Orders.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { ORDER, getOrders } from "../../Redux/ActionTypes";
import { OrderLine } from "../../Redux/Interface";
import moment from "moment";
import { Link } from "react-router-dom";
import Footer from "../FooterComponent/Footer";

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
    <div className="wrap" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
      <div>
        <Navbar />
        <div className="order-wrapper">
          <div className="order">
            <div className="order-title">
              <h3>I tuoi ordini:</h3>
            </div>
            <div className="product-order-wrapper">
              {order.map((e, i) => (
                <div key={i} className="pow">
                  <div className="pow-p">
                    <p>Ordine # {e.id}</p>
                    <p>Totale ordine: {e.totalPrice}€</p>
                    <p>
                      Ordinato il:{" "}
                      {moment(e.initializedOrder).format("DD-MM-YYYY")}
                    </p>
                  </div>
                  {e.orderLine.map((j, index) => (
                    <div key={index} className="product-order">
                      <div style={{ height: "100px" }}>
                        <img src={j.product.image} alt="" />
                        <div className="qty">
                          <p>{j.quantity}</p>
                        </div>
                      </div>
                      <div className="product-order-info">
                        <Link to={`/products/${j.product.id}`}>
                          {j.product.name}
                        </Link>
                        <p>prezzo: {j.price}€</p>
                        <p>
                          Pacco:
                          {j.product.productCategory.name === "FOOD"
                            ? itemConverter(j) + "/kg"
                            : "x" + itemConverter(j)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
export default Orders;

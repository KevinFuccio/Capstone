import { useEffect, useState } from "react";
import { CART_ADD, PRODUCTS, fetchProducts } from "../../../Redux/ActionTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import "./MainPageHeader.scss";
import { Products } from "../../../Redux/Interface";

const MainPageHeader = () => {
  

//   <button
//     onClick={() => cartAdd(el)}
//     disabled={!loggedUser.user.username ? true : false}
//   >
//     +
//   </button>;

  
  return (
    <div className="cards mo5">
      <div>
        <h2>Your Favorite <br/> Grocery Shop here!</h2>
      </div>
    </div>
  );
};
export default MainPageHeader;

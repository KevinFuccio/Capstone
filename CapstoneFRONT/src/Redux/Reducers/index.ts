import { PayloadAction } from "@reduxjs/toolkit";
import { CART_ADD, CART_REMOVE, USER } from "../ActionTypes";
import { MyState, Products, Registration } from "../Interface";

const initialState: MyState = {
  user: {} as Registration,
};
export const userReducer = (
  state = initialState,
  action: PayloadAction<Registration | Products |number>
) => {
  switch (action.type) {
    case USER:
      return {
        user: action.payload as Registration,
      };
    case CART_ADD:
      return {
        user: {
          ...state.user,
          cart: [...state.user.cart, action.payload as Products],
        },
      };
    case CART_REMOVE:
      return {
        user:{
            ...state.user,
            cart: state.user.cart.filter((el) => el.id !== action.payload as number),
        }
      };
    default:
      return state;
  }
};

import { PayloadAction } from "@reduxjs/toolkit";
import { CART_ADD, USER } from "../ActionTypes";
import { MyState, Products, Registration} from "../Interface";

const initialState: MyState = { 
    user: {} as Registration
};
export const userReducer = (state= initialState,action:PayloadAction<Registration|Products>) => { 
    switch(action.type){
        case USER:
            return{
                user: action.payload as Registration
            };
        case CART_ADD:
            return{
                user:{
                    ...state.user,
                    cart:[...state.user.cart,action.payload as Products]
                }
                
            };
        default:
            return state;

    };
};

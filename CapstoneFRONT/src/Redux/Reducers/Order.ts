import { PayloadAction } from "@reduxjs/toolkit";
import { OrderState, ShoppingOrderList } from "../Interface";
import { ORDER } from "../ActionTypes";

const initialState:OrderState ={
    order:[]
}
export const  orderReducer = (state =initialState,action:PayloadAction<ShoppingOrderList[]>)=>{
    switch(action.type){
        case ORDER:
            return{
                order: [...action.payload]
            }
            default:
                return state;
    }

}
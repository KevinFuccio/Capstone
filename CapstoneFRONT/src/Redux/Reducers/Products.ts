import { PayloadAction } from "@reduxjs/toolkit";
import {  Products, ProductsState} from "../Interface";
import { PRODUCTS} from "../ActionTypes";

const initialState:ProductsState = {
    products:[]
}
export const  productReducer = (state =initialState,action:PayloadAction<Products[]>)=>{
    switch(action.type){
        case PRODUCTS:
            return{
                products: [...action.payload]
            }
            default:
                return state;
    }

}
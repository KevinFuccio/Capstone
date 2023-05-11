import { PayloadAction } from "@reduxjs/toolkit";
import { USER } from "../ActionTypes";
import { MyState, Registration, User } from "../Interface";

const initialState: MyState = { 
    user: {} as Registration
};
export const userReducer = (state= initialState,action:PayloadAction<Registration>) => { 
    switch(action.type){
        case USER:
            return{
                user: action.payload as Registration
            };
        default:
            return state;

    };
};

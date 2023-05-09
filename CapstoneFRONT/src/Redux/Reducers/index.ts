import { PayloadAction } from "@reduxjs/toolkit";
import { USER } from "../ActionTypes";
import { MyState, User } from "../Interface";

const initialState: MyState = { 
    user: {} as User
};
export const userReducer = (state= initialState,action:PayloadAction<User>) => { 
    switch(action.type){
        case USER:
            return{
                user: action.payload as User
            };
        default:
            return state;

    };
};

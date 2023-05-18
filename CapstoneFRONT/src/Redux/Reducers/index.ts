import { PayloadAction } from "@reduxjs/toolkit";
import { CART_ADD, CART_CLEAR, CART_MODIFY, CART_REMOVE, TOT_CART, USER } from "../ActionTypes";
import { MyState, Registration, Products, ModifyCartPayload, CartActionPayload } from "../Interface";

const initialState: MyState = {
  user:{} as Registration
};
export const userReducer = (
  state = initialState,
  action: PayloadAction<Registration | Products | Number | ModifyCartPayload |CartActionPayload>
) => {
  switch (action.type) {
    case USER:
      
      return {
        user: action.payload as Registration,
      };
      case CART_ADD:
        const payload = action.payload as Products;
        const itemIndex = state.user.cart.productsItems.findIndex(item => item.id === payload.id);
      
        if (itemIndex >= 0) {
          return {
            ...state,
            user: {
              ...state.user,
              cart: {
                ...state.user.cart,
                productsItems: state.user.cart.productsItems.map(e => {
                  if (e.id === payload.id) {
                    return {
                      ...e,
                      cartQuantity: (e.cartQuantity || 0) + 1
                    };
                  }
                  return e;
                }),
              },
            },
          };
        } else {
          const tempProduct = {...payload, cartQuantity: 1};
          return {
            ...state,
            user: {
              ...state.user,
              cart: {
                ...state.user.cart,
                productsItems: [...state.user.cart.productsItems, tempProduct]
              },
            },
          };
        }
      
    case CART_REMOVE:
      return {
        user:{
            ...state.user,
            cart:{
              ...state.user.cart,
              productsItems:state.user.cart.productsItems.filter((el) => el.id !== action.payload as number)
              
            }
        }
      };
      case CART_MODIFY:
        const payload1: ModifyCartPayload = action.payload as ModifyCartPayload ;

        const {obj,optionValue} = payload1;

        
        console.log(optionValue);
        

        return {
          user:{
            ...state.user,
            cart:{
              ...state.user.cart,
              productsItems: state.user.cart.productsItems.map(e=>{
                if (obj && e.id === obj.id) {
                  return {
                    ...e,
                    cartQuantity: parseInt(optionValue)
                  };
                }
                return e;
              })
            }
          }
        }
      case TOT_CART:
        const {cartSumAmount,cartSumQuantity}: CartActionPayload  = action.payload as CartActionPayload;
        return{
          user:{
            ...state.user,
            cart:{
              ...state.user.cart,
              cartTotalAmount: cartSumAmount,
              cartTotalQuantity:cartSumQuantity
            }
          }
        }
        case CART_CLEAR:
        return{
          user:{
            ...state.user,
            cart:{
              ...state.user.cart,
              productsItems:[],
              cartTotalQuantity: 0,
              cartTotalAmount: 0
            }
          }
        }
        
    default:
      return state;
  }
};

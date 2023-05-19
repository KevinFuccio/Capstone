import { PayloadAction } from "@reduxjs/toolkit";
import {
  CART_ADD,
  CART_CLEAR,
  CART_MODIFY,
  CART_MODIFY_VARIANT,
  CART_REMOVE,
  TOT_CART,
  USER,
} from "../ActionTypes";
import {
  MyState,
  Registration,
  Products,
  ModifyCartPayload,
  CartActionPayload,
  AddPayload,
} from "../Interface";

const initialState: MyState = {
  user: {} as Registration,
};
let obj: Products;
let optionValue: string;
export const userReducer = (
  state = initialState,
  action: PayloadAction<
    | Registration
    | Products
    | Number
    | ModifyCartPayload
    | CartActionPayload
    | AddPayload
  >
) => {
  switch (action.type) {
    case USER:
      return {
        user: action.payload as Registration,
      };
    case CART_ADD:
      const payload = action.payload as AddPayload;
      const { object1, qty } = payload;
      

      const itemIndex = state.user.cart.productsItems.findIndex(
        (item) =>
          item.id === object1.id &&
          item.productVariant.id === object1.productVariant.id
      );

      if (itemIndex >= 0) {
        return {
          ...state,
          user: {
            ...state.user,
            cart: {
              ...state.user.cart,
              productsItems: state.user.cart.productsItems.map((e) => {
                if (
                  e.id === object1.id &&
                  e.productVariant.id === object1.productVariant.id
                ) {
                  return {
                    ...e,
                    cartQuantity: (e.cartQuantity || 0) + parseInt(qty),
                  };
                }
                return e;
              }),
            },
          },
        };
      } else {
        const tempProduct = { ...object1, cartQuantity: parseInt(qty) };
        return {
          ...state,
          user: {
            ...state.user,
            cart: {
              ...state.user.cart,
              productsItems: [...state.user.cart.productsItems, tempProduct],
            },
          },
        };
      }

    case CART_REMOVE:
      const objToRemove = action.payload as Products;

      return {
        user: {
          ...state.user,
          cart: {
            ...state.user.cart,
            productsItems: state.user.cart.productsItems.filter(
              (el) =>
                el.id !== objToRemove.id ||
                el.productVariant.variant !== objToRemove.productVariant.variant
            ),
          },
        },
      };

    case CART_MODIFY:
      const payload1: ModifyCartPayload = action.payload as ModifyCartPayload;

      ({ obj, optionValue } = payload1);

      console.log(payload1);

      return {
        user: {
          ...state.user,
          cart: {
            ...state.user.cart,
            productsItems: state.user.cart.productsItems.map((e) => {
              if (
                obj &&
                e.id === obj.id &&
                e.productVariant.id === obj.productVariant.id
              ) {
                return {
                  ...e,
                  cartQuantity: parseInt(optionValue),
                };
              }
              return e;
            }),
          },
        },
      };
    case CART_MODIFY_VARIANT:
      const payload2: ModifyCartPayload = action.payload as ModifyCartPayload;

      ({ obj, optionValue } = payload2);
      console.log(payload2);

      return {
        user: {
          ...state.user,
          cart: {
            ...state.user.cart,
            productsItems: state.user.cart.productsItems.map((e) => {
              if (obj && e.id === obj.id) {
                return {
                  ...e,
                  productVariant: {
                    id: obj.productVariant.id,
                    variant: optionValue,
                  },
                };
              }
              return e;
            }),
          },
        },
      };
    case TOT_CART:
      const { cartSumAmount, cartSumQuantity }: CartActionPayload =
        action.payload as CartActionPayload;
      return {
        user: {
          ...state.user,
          cart: {
            ...state.user.cart,
            cartTotalAmount: cartSumAmount,
            cartTotalQuantity: cartSumQuantity,
          },
        },
      };
    case CART_CLEAR:
      return {
        user: {
          ...state.user,
          cart: {
            ...state.user.cart,
            productsItems: [],
            cartTotalQuantity: 0,
            cartTotalAmount: 0,
          },
        },
      };

    default:
      return state;
  }
};

import { combineReducers,configureStore } from "@reduxjs/toolkit";
import {userReducer} from "../Reducers/index";
import storage from "redux-persist/lib/storage";
import { persistReducer,persistStore } from "redux-persist";
import { productReducer} from "../Reducers/Products";
import { orderReducer } from "../Reducers/Order";

const reducers = combineReducers({
    user: userReducer,
    products: productReducer,
    order:orderReducer
});

const persistConfig = {
    key: "root",
    storage,
  };

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  export type RootState = ReturnType<typeof store.getState>;
  export const persistor = persistStore(store);
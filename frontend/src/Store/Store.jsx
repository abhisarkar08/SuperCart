import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './Reducers/UserSlice'
import CartSlice  from "./Reducers/CartSlice";
import ProductSlice  from "./Reducers/ProductSlice";

export const Store = configureStore({
    reducer: {
        userReducer: UserSlice,
        productReducer:ProductSlice,
        cartReducer:CartSlice,
    },
})


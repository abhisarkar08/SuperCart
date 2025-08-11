import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null
}

export const CartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        loadCart: (state, action) => {
            state.data = action.payload
        },
    },
})

export const { loadCart } = CartSlice.actions;

export default CartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

export const ProductSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        loadProduct: (state, action) => {
            console.log("Reducer received:", action.payload);
            state.products = action.payload
        },
    },
})

export const { loadProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
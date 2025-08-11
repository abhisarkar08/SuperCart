import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

export const ProductSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        loadProduct: (state, action) => {
            state.data = action.payload
        },
    },
})

export const { loadProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
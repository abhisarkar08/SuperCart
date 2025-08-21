import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loading: false,
}

export const ProductSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        loadProduct: (state, action) => {
            state.products = action.payload
            state.loading = false;
        },
    },
})

export const { loadProduct, setLoading } = ProductSlice.actions;

export default ProductSlice.reducer;
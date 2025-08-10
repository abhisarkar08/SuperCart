import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

const userslice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loaduser: (state, action) => {
            state.data = action.payload
        },
    },
})

export const { loaduser } = userslice.actions;

export default userslice.reducer;
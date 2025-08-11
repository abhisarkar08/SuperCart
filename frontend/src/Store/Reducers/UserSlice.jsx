import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

export const UserSlice = createSlice({
    name: "Users",
    initialState,
    reducers: {
        loadUser: (state, action) => {
            state.data = action.payload
        },
    },
})

export const { loadUser } = UserSlice.actions;

export default UserSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser:(state,action) => {
            // set current user
        },
        setUsers:(state,action) => {
            // set all users
        },
    },
});

export const { setUser, setUsers } = userSlice.actions; 

export default userSlice.reducer;
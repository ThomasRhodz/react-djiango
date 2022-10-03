import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:"user",
    initialState: {
        role: '',
        id: '',
        name: '',
    },
    reducers:{
        setRole: (state, action) => {
            state.role = action.payload
        }
    }

});

export const {setRole} = userSlice.actions;
export default userSlice.reducer;
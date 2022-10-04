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
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setID: (state, action) => {
            state.id = action.payload
        }
    }

});

export const {setRole, setName, setID} = userSlice.actions;
export default userSlice.reducer;
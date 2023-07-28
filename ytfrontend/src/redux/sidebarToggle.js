import {createSlice} from "@reduxjs/toolkit";



export const sidebarToggleSlice = createSlice({
    name:"toggle",
    initialState: false,
    reducers:{
        toggleOn: (state) => !state, // Flip the state to true (toggle on)
        toggleOff: (state) => !state, // Flip the state to false (toggle off)
        setToggle: (state, action) => action.payload,    },

})

export const { toggleOn, toggleOff, setToggle } = sidebarToggleSlice.actions;

export default sidebarToggleSlice.reducer;


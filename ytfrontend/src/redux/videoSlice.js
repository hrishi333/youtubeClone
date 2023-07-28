import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentVideo: null,
    loading: false,
    error: false,
};

export const videoSlice = createSlice({
    name:'video',
    initialState,
    reducers:{
        fetchStart:(state)=>{
            state.loading= true;
        },
        fetchSuccess:(state,action)=>{
            state.currentVideo = action.payload;
            state.loading=false;
            state.error=false;
        },
        fetchFailure:(state)=>{
            state.loading=false;
            state.error= true;
        },
    }
});

export const{
    fetchStart,
    fetchSuccess,
    fetchFailure,
}= videoSlice.actions;

export default videoSlice.reducer;
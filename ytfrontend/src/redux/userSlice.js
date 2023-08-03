import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    currentUser:{
        user:null,
        token:null,
    },
    loading:false,
    error:false
};

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        /*Reducers*/
        loginStart:(state)=>{
            state.loading=true;
        },
        loginSuccess:(state,action,payload)=>{
            state.loading=false ;

            state.currentUser = action.payload;
        },
        loginFailure:(state)=>{
            state.loading=false;
            state.error=true;
        },
        updateUserProfile:(state,action)=>{
            state.currentUser.user = ({...state.currentUser.user,...action.payload})
            return state;
        },
        logout:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=false;
        }
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    updateUserProfile,
    logout
} = userSlice.actions;

export default userSlice.reducer;
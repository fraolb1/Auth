import { createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setCredential(state,action){
            state.userInfo = action.payload
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        logout(state){
            state.userInfo = null
            localStorage.removeItem('userInfo')
        }
    }
})

export const {setCredential,logout} = authSlice.actions

export default authSlice.reducer
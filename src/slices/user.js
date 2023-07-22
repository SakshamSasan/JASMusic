import { createSlice } from "@reduxjs/toolkit";
import { deleteItemFromLocalStorage, getItemFromLocalStorage, setItemInLocalStorage, TokenKey } from "../utils";
import jwt_decode from 'jwt-decode';

const initialUser = localStorage.getItem(TokenKey)?(jwt_decode(getItemFromLocalStorage(TokenKey)).exp>Date.now()/1000?jwt_decode(getItemFromLocalStorage(TokenKey)).sub:null):null


export const userSlice = createSlice(
    {
        name:'user',
        initialState:{value:initialUser},
        reducers:{
            login:(state,action)=>{
                setItemInLocalStorage(TokenKey,action.payload)
                let user = jwt_decode(action.payload)
                state.value = user.sub
            },
            logout:(state)=>{
                deleteItemFromLocalStorage(TokenKey);
                state.value = null
            }
        }
    }
)

export const {login,logout} = userSlice.actions
export default userSlice.reducer;
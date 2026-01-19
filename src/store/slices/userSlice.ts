import { createSlice } from "@reduxjs/toolkit";
import { SessionUser } from "../../utils/asyncStorage";
import { RootState } from "../store";

//defines user object
interface UserSlice{
    currentUser: SessionUser | null;
}
//initialState for userSlice
const initialState: UserSlice = {
    currentUser: null // default state is null- for no user logged in
}
//craete slice
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
     /** 
      * action to set the user state with new state object
      * @param state current state
      * @param action contains the payload(user object)
      */
      setUser:(state, action) =>{
        state.currentUser = action.payload;
      },
     /**
      * action to clear user state
      * @param state current state
      */
      clearUser:(state, action) =>{
         state.currentUser = null; //reset the user state to null
      },
      /**
       * action to update the repective field, no the whole user
       * @param state   keep the existing field
       * @param action  update the provided field
       */
       updateUser:(state, action) =>{
        if(state.currentUser){
            state.currentUser ={
                ...state.currentUser,//keep existing fields
                ...action.payload //update only provided fields
            }
        }
      }



    }
})

//export actions to be used in components
export const{setUser, clearUser, updateUser} = userSlice.actions;

//custom selector to get user state
export const selectUser =(state: RootState) => state.user.currentUser;
export default userSlice.reducer;
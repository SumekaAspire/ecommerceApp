import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
//create and export redux store using configureStore
export const store = configureStore({
    reducer:{
        //register user slice reducer under 'user' key in the state
        //userReducer will be accessed under state.user.
        user: userReducer,
    }
})

//define the type of redux stores state - used in selectors
export type RootState = ReturnType<typeof store.getState>;// return type of getState - return current state of store
export type AppDispatch = typeof store.dispatch; //dispatch function - to send actions to store.

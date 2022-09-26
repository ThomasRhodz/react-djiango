import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter'
import { setupListeners } from '@reduxjs/toolkit/query'


export const store = configureStore({
    reducer:{
        counter: counterReducer,
    },
   
});

setupListeners(store.dispatch);
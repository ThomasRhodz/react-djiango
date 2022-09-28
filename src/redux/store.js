import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
//Redux
import counterReducer from './counter'

//RTK Query
import { userApi } from '../services/userAPi'



export const store = configureStore({
    reducer:{
        counter: counterReducer,
        [userApi.reducerPath]: userApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware,),
   
});

setupListeners(store.dispatch);
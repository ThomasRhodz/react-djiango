import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
//Redux
import userReducer from './user'

//RTK Query
import { userApi } from '../services/userAPi'
import { employeeApi } from '../services/employeeApi';



export const store = configureStore({
    reducer:{
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, employeeApi.middleware),
   
});

setupListeners(store.dispatch);
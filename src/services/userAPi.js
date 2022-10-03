import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi ({
    reducerPath:"userApi",
    baseQuery: fetchBaseQuery({baseUrl: process.env.GATSBY_API_URL}),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query(body) {
                return {
                    url: 'user/',
                    method: 'POST',
                    body,
                };   
            },
            invalidatesTags: ['User'],
        }),

        getUsers: builder.query({
            query(params) {
                return {
                    url: 'user/',
                    method: 'GET',
                    params,
                };   
            },
            providesTags: ['User'],
        }), 

        getActiveUsers: builder.query({
            query(params) {
                return {
                    url: 'user/status/1',
                    method: 'GET',
                    params,
                };   
            },
            providesTags: ['User'],
        }),
        
        getUsersInfo: builder.query({
            query(body) {
                const { email, password} = body;
                return {
                    url: `user/${email}/${password}`,
                    method: 'GET',
                };   
            },
            providesTags: ['User'],
        }), 

        getInactiveUsers: builder.query({
            query(params) {
                return {
                    url: 'user/status/0',
                    method: 'GET',
                    params,
                };   
            },
            providesTags: ['User'],
        }), 

        updateUser: builder.mutation({
            query(body) {
                const {id, data} = body;
                return {
                    url: `user/${id}`,
                    method: 'PUT',
                    body: data,

                };     
            },
            invalidatesTags: ['User'],
        }),

        deleteUser: builder.mutation({
            query(id) {
                return {
                    url: `user/${id}`,
                    method: 'DELETE',
                };     
            },
            invalidatesTags: ['User'],
        }),

    })
})

export const {useAddUserMutation, useDeleteUserMutation, useGetUsersQuery,useGetActiveUsersQuery, useGetUsersInfoQuery, useGetInactiveUsersQuery, useUpdateUserMutation} = userApi;
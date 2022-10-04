import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApi = createApi ({
    reducerPath:"postApi",
    baseQuery: fetchBaseQuery({baseUrl: process.env.GATSBY_API_URL}),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        addPost: builder.mutation({
            query(body) {
                return {
                    url: 'post/',
                    method: 'POST',
                    body,
                };   
            },
            invalidatesTags: ['Post'],
        }),

        getPosts: builder.query({
            query(params) {
                return {
                    url: 'post/',
                    method: 'GET',
                    params,
                };   
            },
            providesTags: ['Post'],
        }), 

        getReviewPosts: builder.query({
            query(params) {
                return {
                    url: 'post/status/2',
                    method: 'GET',
                    params,
                };   
            },
            providesTags: ['Post'],
        }),

        getPassedPosts: builder.query({
            query(params) {
                return {
                    url: 'post/status/1',
                    method: 'GET',
                    params,
                };   
            },
            providesTags: ['Post'],
        }),
        
        getRejectedPosts: builder.query({
            query(params) {
                return {
                    url: 'post/status/0',
                    method: 'GET',
                    params,
                };   
            },
            providesTags: ['Post'],
        }), 

        updatePost: builder.mutation({
            query(body) {
                const {id, data} = body;
                return {
                    url: `post/${id}`,
                    method: 'PUT',
                    body: data,

                };     
            },
            invalidatesTags: ['Post'],
        }),

        deletePost: builder.mutation({
            query(id) {
                return {
                    url: `post/${id}`,
                    method: 'DELETE',
                };     
            },
            invalidatesTags: ['Post'],
        }),

    })
})

export const {useAddPostMutation, useDeletePostMutation, useGetPostsQuery, useGetPassedPostsQuery, useGetRejectedPostsQuery, useGetReviewPostsQuery, useUpdatePostMutation} = postApi;
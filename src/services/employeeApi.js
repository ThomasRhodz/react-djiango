import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const employeeApi = createApi ({
    reducerPath:"employeeApi",
    baseQuery: fetchBaseQuery({baseUrl: process.env.GATSBY_API_URL}),
    tagTypes: ['Employee'],
    endpoints: (builder) => ({
        addEmployee: builder.mutation({
            query(body) {
                return {
                    url: 'employee/',
                    method: 'POST',
                    body,
                };   
            },
            invalidatesTags: ['Employee'],
        }),
        getEmployees: builder.query({
            query(params) {
                return {
                    url: 'employee/',
                    method: 'GET',
                    params,
                };   
            },
            providesTags: ['Employee'],
        }), 

        getActiveEmployees: builder.query({
            query(params) {
                return {
                    url: 'employee/status/1',
                    method: 'GET',
                    params,
                };   
            },
            providesTags: ['Employee'],
        }), 

        getInactiveEmployees: builder.query({
            query(params) {
                return {
                    url: 'employee/status/0',
                    method: 'GET',
                    params,
                };   
            },
            providesTags: ['Employee'],
        }), 

        updateEmployee: builder.mutation({
            query(body) {
                const {id, data} = body;
                return {
                    url: `employee/${id}`,
                    method: 'PUT',
                    body: data,

                };     
            },
            invalidatesTags: ['Employee'],
        }),

        deleteEmployee: builder.mutation({
            query(id) {
                return {
                    url: `employee/${id}`,
                    method: 'DELETE',
                };     
            },
            invalidatesTags: ['Employee'],
        }),

    })
})

export const {useAddEmployeeMutation, useDeleteEmployeeMutation, useGetEmployeesQuery,useGetActiveEmployeesQuery, useGetInactiveEmployeesQuery, useUpdateEmployeeMutation} = employeeApi;
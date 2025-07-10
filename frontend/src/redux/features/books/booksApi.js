import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const  baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {     //(Headers) : It will check the token
        const token =  localStorage.getItem('token');
        if(token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) =>({
        fetchAllBooks: builder.query({       // we  use query when we want to get data and use mutation when we need to do update, delete, post
            query: () => "/",
            providesTags: ["Books"]
        }),
      
    })
})

export const {useFetchAllBooksQuery } = booksApi;
export default booksApi;
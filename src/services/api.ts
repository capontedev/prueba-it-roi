import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IApi } from '../interfaces/api-interface'

export const api = createApi({
  reducerPath: 'testApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getApiById: builder.query<IApi, string>({
      query: (id) => `/posts/${id}`,
    }),
    getApiByAll: builder.query<IApi[], null>({
      query: () => `/posts`,
    }),
  }),
})

export const { useGetApiByIdQuery, useGetApiByAllQuery } = api
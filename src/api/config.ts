import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://dummyjson.com/'

const baseQuery = fetchBaseQuery({ baseUrl: API_URL })

export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
  reducerPath: 'api',
});
import { api } from "./config";
import { URI } from "./uri";

export interface IProduct {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  [key: string]: any; 
}

interface IGetProductsResponse {
  recipes: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

interface IGetProductsQueryParams {
  skip?: number;
  limit?: number;
}

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IGetProductsResponse, IGetProductsQueryParams>({
      query: (arg) => ({
        method: 'GET',
        url: URI.recipes,
        params: { ...arg } 
      }),
      transformResponse: (response: IGetProductsResponse) => response,
    }),
  }),
  overrideExisting: true,
});

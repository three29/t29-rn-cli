// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*
 * THIS IS ONLY AN EXAMPLE, YOU WILL WANT TO DELETE THIS FILE AND USE
 *
 * t29-rn create api Name
 *
 * FROM THE ROOT DIRECTORY, THIS WILL CREATE A NEW FRESH REDUX TOOLKIT RTK QUERY FOR YOU.
 *
 */

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({ query: (name) => `pokemon/${name}` }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi;

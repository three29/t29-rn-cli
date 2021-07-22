import Config from '../Config/debugConfig';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import exampleSlice from './exampleSlice';
import Reactotron from '../Config/reactotronConfig';
import { setupListeners } from '@reduxjs/toolkit/query';

import { pokemonApi } from '../Services/pokemon';

const middleware = [
  ...getDefaultMiddleware(),
  pokemonApi.middleware,
  Config.useReactotron ? Reactotron.createEnhancer() : null,
];

export const store = configureStore({
  reducer: {
    example: exampleSlice,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    middleware,
  },
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

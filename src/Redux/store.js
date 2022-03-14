import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import trackerReducer from './Reducer'

export default configureStore({
    reducer: {
      tracker: trackerReducer,
    },
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  });
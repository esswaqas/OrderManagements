import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mainSlice from './Slices/MainSlice';

// Redux Persist Configuration
const persistConfig = {
  key: 'root', // Key for storage
  storage: AsyncStorage, // Use AsyncStorage to persist data
  whitelist: ['auth'], // Only persist the 'auth' reducer
};

// Wrap the MainSlice reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, mainSlice);

// Configure Redux Store
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serialization check
    }),
});

// Create the persistor
export const persistor = persistStore(store);

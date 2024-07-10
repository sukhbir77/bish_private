import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './slicers/userSlicer';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['_persist'],
      },
    }),
});

// Persistor
const persistor = persistStore(store);

export { store, persistor };

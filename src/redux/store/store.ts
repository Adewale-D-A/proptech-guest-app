/** @format */

import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducer";
import { apiMiddleware } from "../services/base/base";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "auth-email", "apt", "tab"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiMiddleware),
  reducer: persistedReducer,
});

export let persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

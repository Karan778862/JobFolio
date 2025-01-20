import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import jobSlice from "./JobSlice.js";
import companySclice from "./comapnySlice.js";
import applicationSlice from "./applicationSlice.js";

import {
  
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
    auth:authSlice,
    job:jobSlice,
    company:companySclice,
    application:applicationSlice,


})
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export default store;

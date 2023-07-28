import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from '../redux/userSlice'
import toggleReducer from '../redux/sidebarToggle'
import videoReducer from '../redux/videoSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {videoSlice} from "./videoSlice"; // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
}
const rootReducer = combineReducers({
    user: userReducer,
    toggle: toggleReducer,
    video: videoReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store)

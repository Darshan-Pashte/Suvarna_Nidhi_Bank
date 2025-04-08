import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
// import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'

// import userDetailReducer from "./userDetailSlice";
// import userSessionDetailSlice from "./userSessionDetailSlice";
import authReducer from './authSlice';
// import  entityDetailsReducer  from './entitySlice';

const rootReducer = combineReducers({
    // advanceFilter: advanceFilterReducer,
    // userDetail: userDetailReducer,
    // userSessionDetail: userSessionDetailSlice,
    auth:authReducer
    // entityDetails:entityReducer,
    // fixture:fixtureLandingSlice
})

const persistConfig = {
    key: 'root',
    storage:storageSession,
    blacklist: ['advanceFilter']
}

 const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: 'production',
    middleware: [thunk]
});

export const persistor = persistStore(store)

export const clearLocalStorageOnLogout = () => {
    persistor.purge(); // This will clear the entire persisted state
    // You can also clear specific items from local storage if needed
    // localStorage.removeItem('persist:root');
};
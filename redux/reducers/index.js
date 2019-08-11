// MODULE TO CONFIURE REDUX-PERSIST
// AND EXPORT COMBINED REDUCERS
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

import test from './test';
import auth from './auth';
import location from './location';
import deck from './deck';
import chat from './chat';


// CONFIGS
const rootPersistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel1,
    blacklist: ['deck']
}

const createConfig = (key, blacklist) => ({
    key,
    storage,
    blacklist
});
const testPersistConfig = createConfig('test', []);
const authPersistConfig = createConfig('auth', []);
const locationPersistConfig = createConfig('location', []);

// COMBINE REDUCERS
const appReducer = combineReducers({
    test,
    auth: persistReducer(authPersistConfig, auth),
    location: persistReducer(locationPersistConfig, location),
    deck,
    chat
});

// RESET ROOT REDUCER
const rootReducer = (state, action) => {
    if(action.type === 'USER_LOGOUT') {
        storage.removeItem('persist:root');
        storage.removeItem('persist:test');
        storage.removeItem('persist:auth');
        storage.removeItem('persist:location');

        state = undefined;
    }
    return appReducer(state, action);
}

export default persistReducer(rootPersistConfig, rootReducer);
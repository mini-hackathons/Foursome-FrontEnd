// MODULE TO CONFIURE REDUX-PERSIST
// AND EXPORT COMBINED REDUCERS
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

import test from './test';
import auth from './auth';
import location from './location';


// CONFIGS
const rootPersistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel1,
    blacklist: []
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
const rootReducer = combineReducers({
    test,
    auth: persistReducer(authPersistConfig, auth),
    location: persistReducer(locationPersistConfig, location)
});

export default persistReducer(rootPersistConfig, rootReducer);
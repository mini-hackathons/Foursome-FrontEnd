import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import persistedReducer from './reducers';

export const store = createStore(
  persistedReducer,
  {},
  compose(
    applyMiddleware(thunk)
  )
);
export const persistor = persistStore(store);
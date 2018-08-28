import { createStore, compose } from 'redux';

import reducer from './../reducers';
import middleware from './../middleware';
import initialState from './initialState';

const store = createStore(
  reducer,
  initialState,
  compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);
// compose(middleware)(createStore)(reducer, initialState);

export default store;

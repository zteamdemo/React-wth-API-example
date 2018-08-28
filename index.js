import { applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axiosMiddleware from './axiosMiddleware';

const middlewareList = [
  thunk,
  axiosMiddleware,
  ((typeof __DEV__ !== 'undefined')) && logger,
].filter(Boolean);

export default applyMiddleware(...middlewareList);

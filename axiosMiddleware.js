import axios from 'axios';
import config from './../config';

const axiosMiddleware = () => next => (action) => {
  if (action.url) {
    // const state = store.getState();
    // const token = state.authReducer.login.accessToken || action.accessToken;

    const {
      url, method, payload, params, token, ...rest
    } = action;

    next({
      ...rest,
      type: `${rest.type}_REQUEST`,
      url,
      method,
      payload,
    });

    if (typeof __DEV__ !== 'undefined') console.info('REQUEST = ', action);

    const options = {
      url: (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) ? url : `${config.CALL_API_URL}${url}`,
      method: method || 'GET',
      data: (method && method !== 'GET') ? {
        ...payload,
      } : payload,
      params,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: token } : {}),
      },
    };

    if (typeof __DEV__ !== 'undefined') console.info('Options = ', options);
    return new Promise((resolve, reject) => {
      axios(options).then((response) => {
        if (typeof __DEV__ !== 'undefined') console.info('THEN response = ', response);
        if (response.data.errorMessage) {
          throw new Error(response.data.errorMessage);
        }
        // temporary fix to catch auth errors
        // todo remove this after normal API comes.
        if (response.data.retcode && response.data.retcode !== 0) {
          throw new Error(response.data.status);
        }
        resolve(response);
        next({
          ...rest,
          type: `${rest.type}_SUCCESS`,
          payload: response.data,
        });
      }).catch((error) => {
        if (typeof __DEV__ !== 'undefined') console.info('CATCH error = ', error);
        reject(error);
        next({
          ...rest,
          type: `${rest.type}_FAILURE`,
          errorMessage: error.message,
          error,
        });
      });
    });
  }
  return next(action);
};

export default axiosMiddleware;

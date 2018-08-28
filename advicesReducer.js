import merge from 'deepmerge';

import initialState from './../store/initialState';
import injectReducer from './../store/injectReducer';
import { sanitizeAdviceReducer } from '../helpers/sanitize';
import {
  FETCH_ADVICE_CAROUSELS_ITEMS_SUCCESS,
  GET_PHOTO_ADVICE_SUCCESS,
  GET_ADVICE_POST_SUCCESS,
  USER_COMMENT_SUCCESS,
} from '../store/actionTypes';

export default injectReducer(initialState.advicesReducer, {
  [GET_PHOTO_ADVICE_SUCCESS]: (state, { payload }) => ({
    ...state,
    advices: payload.reduce((acc, cur) => {
      acc[cur._id] = cur;
      return acc;
    }, merge({}, state.advices, { arrayMerge: (dest, source) => source })),
  }),
  [FETCH_ADVICE_CAROUSELS_ITEMS_SUCCESS]: (state, { payload }) => ({
    ...state,
    advices: payload.results.reduce((acc, cur) => {
      acc[cur._id] = sanitizeAdviceReducer(cur);
      return acc;
    }, merge({}, state.advices, { arrayMerge: (dest, source) => source })),
  }),
  [GET_ADVICE_POST_SUCCESS]: (state, { payload }) => {
    if (Array.isArray(payload) && payload.length === 0) {
      return state;
    }
    if (Array.isArray(payload) && payload.length > 0) {
      return {
        ...state,
        advices: payload.reduce((acc, cur) => {
          acc[cur._id] = sanitizeAdviceReducer(cur);
          return acc;
        }, merge({}, state.advices, { arrayMerge: (dest, source) => source })),
      };
    }
    return {
      ...state,
      advices: {
        ...state.advices,
        [payload._id]: state.advices[payload._id] ?
          merge(
            state.advices[payload._id], sanitizeAdviceReducer(payload),
            { arrayMerge: (dest, source) => source },
          ) :
          sanitizeAdviceReducer(payload),
      },
    };
  },
  [USER_COMMENT_SUCCESS]: (state, { payload, isReply }) => {
    const { comment } = payload;
    if (!isReply && comment.adviceid && state.advices[comment.adviceid]) {
      const adviceComments = merge([], state.advices[comment.adviceid].comments);
      adviceComments.unshift(comment._id);
      return merge(state, {
        advices: {
          [comment.adviceid]: {
            comments: adviceComments,
          },
        },
      }, { arrayMerge: (dest, source) => source });
    }
    return state;
  },
});

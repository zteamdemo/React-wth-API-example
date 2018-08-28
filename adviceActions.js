import QueryString from 'query-string';

import { GET_ADVICE_POST } from './../store/actionTypes';

/**
 * get advice object by path.
 * @param {string} path - advice path
 * @return {object} - valid react action object
 */
export const getAdvicePostByPath = path => ({
  type: GET_ADVICE_POST,
  url: `/api/v1/advice/advicerequest?path=${path}`,
});

/**
 * get advice object by id, can populate additional data.
 * @param {string} adviceId - id of advice you need to get.
 * @param {object} params
 * @param {array|string} params.populate - populate additional fields,
 * could be single string or array of strings.
 * @return {object} - valid react action object
 */
export const getAdvicePostById = (adviceId, params = null) => ({
  type: GET_ADVICE_POST,
  url: params === null ?
    `/api/v2/advice/${adviceId}` :
    `/api/v2/advice/${adviceId}?${QueryString.stringify(params)}`,
});

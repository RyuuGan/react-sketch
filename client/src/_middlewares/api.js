import { LOCATION_CHANGE } from 'react-router-redux';
import api from '../utils/api';
import { AuthService } from '../_services/auth.service';

function callApi(endpoint, method, data, apiPrefix = '') {

  let config = {
    credentials: 'include',
    method: method,
    headers: AuthService.getAuthConfig().headers
  };

  if (data && method.toUpperCase() === 'POST') {
    config.body = JSON.stringify(data);
  }

  return fetch(api.makeUrl(endpoint, apiPrefix), config)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response)
      }
      return response.json().then(json => ({ json, response }))
    }).then(({ json /*, response*/ }) => {
      if (json.error) {
        return Promise.reject(json);
      }
      return json.results;
    }); // eslint-disable-line no-console
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {

  const callAPI = action[CALL_API];

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { apiPrefix, endpoint, type, method, data, redirectTo } = callAPI;

  const requestType = type + '_REQUEST';
  const successType = type + '_SUCCESS';
  const errorType = type + '_FAILED';
  next({
    action: callAPI,
    type: requestType,
    data,
    redirectTo
  });
  return callApi(endpoint, method, data, apiPrefix).then(
    response => {
      next({
        action: callAPI,
        response,
        type: successType
      });
      if (redirectTo) {
        next({
          type: LOCATION_CHANGE,
          payload: {
            pathname: redirectTo,
            action: 'PUSH',
            search: '',
            hash: ''
          }
        });
      }
    },
    error => next({
      action: callAPI,
      error: error,
      type: errorType
    })
  )
}

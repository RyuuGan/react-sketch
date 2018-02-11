import { userConstants } from '../_constants';

const initialState = {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        error: action.error
      };
    case userConstants.LOGOUT:
      return {};

    case userConstants.PRINCIPAL_REQUEST:
      return {
        fetchingUser: true
      };
    case userConstants.PRINCIPAL_SUCCESS:
      return {
        userFetched: true,
        user: action.user
      };
    case userConstants.PRINCIPAL_FAILURE:
      return {
        userFetched: true
      };
    case userConstants.CLEAR_LOGIN_ERROR:
      return {};
    default:
      return state
  }
}

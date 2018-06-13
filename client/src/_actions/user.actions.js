import { userConstants } from '../_constants';
import { authService } from '../_services';
import { CALL_API } from '../_middlewares/api';

export const userActions = {
  login,
  clearLoginError,
  clearSignupError,
  logout,
  register,
  fetchPrincipal,
  loadUsers
};

function fetchPrincipal() {
  return dispatch => {
    dispatch(request());
    authService.fetchPrincipal()
      .subscribe(user => {
        dispatch(success(user));
      }, error => {
        dispatch(failure(error));
      });
  };

  function request(user) {
    return { type: userConstants.PRINCIPAL_REQUEST, user }
  }

  function success(user) {
    return { type: userConstants.PRINCIPAL_SUCCESS, user }
  }

  function failure(error) {
    return { type: userConstants.PRINCIPAL_FAILURE, error }
  }
}

function login(email, password) {
  return dispatch => {
    dispatch(request({ username: email }));

    authService
      .login({
        email,
        password
      }).then(user => {
        dispatch(success(user));
      }, error => {
        dispatch(failure(error));
        // TODO: Alerts here
      }
    );
  };

  function request(credentials) {
    return { type: userConstants.LOGIN_REQUEST, credentials }
  }

  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user }
  }

  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error }
  }
}

function logout() {
  authService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    authService.signup(user)
      .then(
        user => {
          dispatch(success(user));
          // TODO: some alert stuff here
        },
        error => {
          dispatch(failure(error));
          // TODO: Alerts here
        }
      );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user }
  }

  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user }
  }

  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error }
  }
}

function clearLoginError() {
  return dispatch => {
    dispatch(clear());

  };

  function clear() {
    return { type: userConstants.CLEAR_LOGIN_ERROR }
  }

}

function clearSignupError() {
  return dispatch => {
    dispatch(clear());

  };

  function clear() {
    return { type: userConstants.CLEAR_SIGNUP_ERROR }
  }
}

export function loadUsers() {
  return dispatch => {
    dispatch({
      [CALL_API]: {
        type: userConstants.USERS_LIST,
        endpoint: '/users',
        apiPrefix: 'data',
        method: 'GET'
      }
    });
  }
}

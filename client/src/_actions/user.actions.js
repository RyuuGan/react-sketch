import { userConstants } from '../_constants';
import { authService, userService } from '../_services';
import { history } from '../store';

export const userActions = {
  login,
  clearLoginError,
  logout,
  register,
  fetchPrincipal
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
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user)
      .then(
        user => {
          dispatch(success());
          history.push('/login');
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
    dispatch(request());

  };

  function request() {
    return { type: userConstants.CLEAR_LOGIN_ERROR }
  }

}

import { headerConstants } from '../_constants';

export const headerActions = {
  registerMenuToggler,
  clearMenuToggler
};

function registerMenuToggler(fn) {
  return dispatch => {
    dispatch({ type: headerConstants.REGISTER_MENU_TOGGLER, fn });
  };
}

function clearMenuToggler() {
  return dispatch => {
    dispatch({ type: headerConstants.CLEAR_MENU_TOGGLER });
  };
}

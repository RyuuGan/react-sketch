import { headerConstants } from '../_constants';

export function header(state = {}, action) {
  switch (action.type) {
    case headerConstants.REGISTER_MENU_TOGGLER:
      return {
        fn: action.fn
      };
    case headerConstants.CLEAR_MENU_TOGGLER:
      return {};
    default:
      return state
  }
}

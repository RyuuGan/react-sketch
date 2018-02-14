import { dataConstants } from '../_constants';

const initialState = {};

export function data(state = initialState, action) {
  switch (action.type) {
    case dataConstants.API_DATA_REQUEST:
      return {
        loaded: false
      };

    case dataConstants.API_DATA_SUCCESS:
      return {
        loaded: true,
        data: action.response.data
      };

    case dataConstants.API_DATA_FAILED:
      return {
        loaded: true,
        error: action.error
      };

    default:
      return state
  }
}

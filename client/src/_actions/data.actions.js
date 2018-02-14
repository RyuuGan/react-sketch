import { CALL_API } from '../_middlewares/api';
import { API_DATA } from '../_constants';

export const dataActions = {
  loadData
};

export function loadData() {
  return dispatch => {
    dispatch({
      [CALL_API]: {
        type: API_DATA,
        endpoint: '/test',
        apiPrefix: 'data',
        method: 'GET'
      }
    });
  }
}

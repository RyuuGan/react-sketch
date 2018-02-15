import { dataConstants } from '../_constants';
import { apiReducerFactory } from '../utils/apiReducerFactory';

export const data = apiReducerFactory(dataConstants.API_DATA, {}, action => action.response.data);

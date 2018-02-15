import { userConstants } from '../_constants';
import { apiReducerFactory } from '../utils/apiReducerFactory';

export const users = apiReducerFactory(userConstants.USERS_LIST, {});

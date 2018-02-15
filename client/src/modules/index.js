import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import counter from './counter';
import { authentication, data, users, header, registration } from '../_reducers';

export default combineReducers({
  routing: routerReducer,
  counter,
  authentication,
  data,
  registration,
  header,
  users
});

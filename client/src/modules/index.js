import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import counter from './counter';
import { alert, authentication, registration } from '../_reducers';

export default combineReducers({
  routing: routerReducer,
  counter,
  authentication,
  registration,
  alert
});

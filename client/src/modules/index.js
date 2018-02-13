import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import counter from './counter';
import { authentication, registration, header } from '../_reducers';

export default combineReducers({
  routing: routerReducer,
  counter,
  authentication,
  registration,
  header
});

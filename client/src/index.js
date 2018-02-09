import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './routes/app';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';

import 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const target = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>,
  target
);
registerServiceWorker();

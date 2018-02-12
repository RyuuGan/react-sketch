import React from 'react';
import './App.css';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Home from '../home'
import { LoginPage } from '../auth/login';
import { SignupPage } from '../auth/signup';
import { connect } from 'react-redux';
import { Header } from '../../components/header';
import { userActions } from '../../_actions/user.actions';
import { authService } from '../../_services';
import { NotFoundPage } from '../notFoundPage';
import { PrivateRoute } from '../privateRoute';
import { MyLayout } from '../my/layout';

class App extends React.Component {
  render() {
    if (!this.props.loaded) {
      return null;
    }
    return (
      <div className="App">
        <Header/>
        <main>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Redirect exact from="/auth" to="/auth/login"/>
            <Route exact path="/auth/login" component={LoginPage}/>
            <Route exact path="/auth/signup" component={SignupPage}/>
            <PrivateRoute path="/my" component={MyLayout}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </main>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userActions.fetchPrincipal());
  }
}

function mapStateToProps(state) {
  let { user } = state.authentication;
  let loaded = authService.loaded;
  return {
    user,
    loaded
  };
}

const connectedApp = withRouter(connect(mapStateToProps)(App));
export { connectedApp as App };

import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MyDashboard } from './dashboard';

class MyLayout extends React.Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path="/my/dashboard" component={MyDashboard}/>
          <Redirect to="/my/dashboard"/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const connectedMyLayout = connect(mapStateToProps)(MyLayout);
export { connectedMyLayout as MyLayout };

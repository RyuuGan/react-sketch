import React from 'react';
import { connect } from 'react-redux';

class MyDashboard extends React.Component {

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const connectedMyDashboard = connect(mapStateToProps)(MyDashboard);
export { connectedMyDashboard as MyDashboard };

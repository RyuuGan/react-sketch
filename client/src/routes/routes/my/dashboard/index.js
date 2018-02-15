import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dataActions, userActions } from '../../../../_actions';

class MyDashboard extends React.Component {

  componentDidMount() {
    this.props.loadData();
    this.props.loadUsers();
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>

        {this.props.loaded && !this.props.error &&
        <ul>
          {this.props.data.map(m => <li key={m}>{m}</li>)}
        </ul>
        }

        <h1>Users</h1>
        {this.props.users.loaded && !this.props.users.error &&
        <ul>
          {this.props.users.data.items.map(u => <li key={u._id}>{u.title}</li>)}
        </ul>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { loaded, data, error } = state.data;
  return {
    loaded,
    data,
    error,
    users: state.users
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  loadData: dataActions.loadData,
  loadUsers: userActions.loadUsers
}, dispatch);

const connectedMyDashboard = connect(mapStateToProps, mapDispatchToProps)(MyDashboard);
export { connectedMyDashboard as MyDashboard };

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions } from '../../../../_actions';

class MyUsers extends React.Component {

  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    return (
      <div>
        <h1>Users</h1>

        {this.props.loaded && !this.props.error &&
        <ul>
          {this.props.data.items.map(u => <li key={u._id}>{u.title}</li>)}
        </ul>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { loaded, data, error } = state.users;
  return {
    loaded,
    data,
    error
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  loadUsers: userActions.loadUsers
}, dispatch);

const connectedMyUsers = connect(mapStateToProps, mapDispatchToProps)(MyUsers);
export { connectedMyUsers as MyUsers };

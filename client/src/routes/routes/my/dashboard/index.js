import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dataActions } from '../../../../_actions';

class MyDashboard extends React.Component {

  componentDidMount() {
    this.props.loadData();
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { loaded, data, error } = state.data;
  return {
    loaded,
    data,
    error
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  loadData: dataActions.loadData
}, dispatch);

const connectedMyDashboard = connect(mapStateToProps, mapDispatchToProps)(MyDashboard);
export { connectedMyDashboard as MyDashboard };

import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import './styles.header.css';

class Header extends React.Component {

  render() {
    return <div className="header">
      <AppBar position="static">
        <Toolbar>
          <IconButton className="header-menu"
                      color="inherit"
                      aria-label="Menu">
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="title" color="inherit" className="header-flex">

            Title
          </Typography>
          {!this.props.user && (
            <Button color="inherit"
                    onClick={() => this.props.toLoginPage()}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toLoginPage: () => push('/auth/login')
}, dispatch);

let connectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export { connectedHeader as Header }

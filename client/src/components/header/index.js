import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Hidden from 'material-ui/Hidden';
import { userActions } from '../../_actions';
import { bindActionCreators } from 'redux';

import './styles.header.css';

class Header extends React.Component {

  render() {
    return <div className="header">
      <AppBar position="static">
        <Toolbar>
          <Hidden mdUp>
            {
              this.props.fn &&
              <IconButton className="header-menu"
                          color="inherit"
                          onClick={this.props.fn}
                          aria-label="Menu">
                <Icon>menu</Icon>
              </IconButton>
            }
          </Hidden>
          <Typography variant="title" color="inherit" className="header-flex">

            Title
          </Typography>
          {!this.props.user && (
            <Button color="inherit"
                    to='/auth/login'
                    component={Link}>Login</Button>
          )}
          {
            this.props.user && (
              <Button color="inherit"
                      to='/my'
                      component={Link}>my</Button>
            )
          }
          {
            this.props.user && (
              <Button color="inherit"
                      onClick={this.props.logout}>Logout</Button>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { fn } = state.header;
  return {
    user,
    fn
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  logout: userActions.logout
}, dispatch);


let connectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export { connectedHeader as Header }

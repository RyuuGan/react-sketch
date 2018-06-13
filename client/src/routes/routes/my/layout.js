import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { MyDashboard } from './dashboard/index';

import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem } from 'material-ui/List';
import { NotFoundPage } from '../../notFoundPage';
import { bindActionCreators } from 'redux';
import { headerActions } from '../../../_actions/index';
import { MyUsers } from './users';

const drawerWidth = 240;

const styles = theme => ({
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%'
    }
  },
  drawerActive: {
    background: '#f3f3f3'
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3
  }
});

class MyLayout extends React.Component {

  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  componentWillMount() {
    this.props.registerMenuToggler(this.handleDrawerToggle);
  }

  componentWillUnmount() {
    this.props.clearMenuToggler();
  }

  render() {

    const { classes, theme, user } = this.props;

    const drawer = (
      <div>
        <h1>{user.title}</h1>
        <List>
          <ListItem button
                    component={NavLink}
                    to='/my/dashboard'
                    activeClassName={classes.drawerActive}
                    onClick={this.handleDrawerToggle}>Dashboard</ListItem>
          <ListItem button
                    component={NavLink}
                    to='/my/users'
                    activeClassName={classes.drawerActive}
                    onClick={this.handleDrawerToggle}>Users</ListItem>
        </List>
        <Divider/>
      </div>
    );

    return (
      <div className="App-content">
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <Switch>
            <Route path="/my/dashboard" component={MyDashboard}/>
            <Route path="/my/users" component={MyUsers}/>
            <Redirect exact from='/my' to="/my/dashboard"/>
            <Route component={NotFoundPage}/>
          </Switch>
        </main>
      </div>
    );
  }
}

MyLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { user } = state.authentication;
  return {
    user
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  registerMenuToggler: headerActions.registerMenuToggler,
  clearMenuToggler: headerActions.clearMenuToggler
}, dispatch);

const connectedMyLayout = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(MyLayout));
export { connectedMyLayout as MyLayout };

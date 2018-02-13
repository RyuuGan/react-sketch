import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

import { userActions } from '../../../_actions';
import { bindActionCreators } from 'redux';

import './login.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      submitted: false,
      redirectToReferrer: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleCloseSnackbar() {
    this.props.clearLoginError();
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    if (email && password) {
      this.props.login(email, password);
    }
  }

  render() {
    const { email, password } = this.state;
    const { error, user } = this.props;

    const { from } = this.props.location.state || { from: { pathname: '/my' } };

    if (user) {
      return <Redirect to={from} />;
    }

    const isOpen = error && error.code === 'USER_NOT_FOUND';
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
          open={isOpen}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">User not found.</span>}
        />
        <ValidatorForm ref="form"
                       onSubmit={this.handleSubmit}>
          <Card className="login-form">
            <CardHeader title="Login">
            </CardHeader>
            <CardContent>
              <TextValidator
                id="email"
                name="email"
                label="Email"
                value={email}
                fullWidth
                onChange={this.handleChange}
                validators={['required']}
                errorMessages={['This field is required']}
                margin="normal"
              />
              <TextValidator
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                fullWidth
                onChange={this.handleChange}
                validators={['required']}
                errorMessages={['This field is required']}
              />
            </CardContent>
            <CardActions>
              <div className="flex-fill"/>
              <Button variant="raised"
                      type="submit"
                      size="small"
                      color="primary">Login</Button>
              <Button size="small"
                      to='/auth/signup'
                      component={Link}>Sign up</Button>
              <div className="flex-fill"/>
            </CardActions>
          </Card>
        </ValidatorForm>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loggingIn, error, user } = state.authentication;
  return {
    loggingIn,
    error,
    user
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  login: userActions.login,
  clearLoginError: userActions.clearLoginError
}, dispatch);

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export { connectedLoginPage as LoginPage };

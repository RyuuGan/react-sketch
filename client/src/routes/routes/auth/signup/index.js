import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../../../_actions/index';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import { bindActionCreators } from 'redux';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        firstName: '',
        lastName: '',
        password: ''
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.firstName && user.lastName && user.email && user.password) {
      this.props.register(user);
    }
  }

  handleCloseSnackbar() {
    this.props.clearSignupError();
  }

  render() {
    const { user } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/my' } };
    const { error, loggedUser } = this.props;

    if (loggedUser) {
      return <Redirect to={from} />;
    }

    const isOpen = error && error.code === 'USER_ALREADY_EXISTS';

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
          message={<span id="message-id">User with this email already exists.</span>}
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
                value={user.email}
                fullWidth
                onChange={this.handleChange}
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'This field must be a valid email address.']}
                margin="normal"
              />
              <TextValidator
                id="firstName"
                name="firstName"
                label="First name"
                value={user.firstName}
                fullWidth
                onChange={this.handleChange}
                validators={['required']}
                errorMessages={['This field is required']}
              />
              <TextValidator
                id="lastName"
                name="lastName"
                label="Last name"
                value={user.lastName}
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
                value={user.password}
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
                      color="primary">Sign up</Button>
              <Button size="small"
                      to='/auth/login'
                      component={Link}>Login</Button>
              <div className="flex-fill"/>
            </CardActions>
          </Card>
        </ValidatorForm>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { registering, error } = state.registration;
  return {
    registering,
    error,
    loggedUser: user
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  register: userActions.register,
  clearSignupError: userActions.clearSignupError
}, dispatch);

const connectedSignupPage = connect(mapStateToProps, mapDispatchToProps)(SignupPage);
export { connectedSignupPage as SignupPage };

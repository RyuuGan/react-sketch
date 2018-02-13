import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../../../_actions/index';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';

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
    const { dispatch } = this.props;
    if (user.firstName && user.lastName && user.email && user.password) {
      dispatch(userActions.register(user));
    }
  }

  render() {
    // TODO: not implemented actual sign up
    const { user } = this.state;
    return (
      <div>
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
  const { registering } = state.registration;
  return {
    registering
  };
}

const connectedSignupPage = connect(mapStateToProps)(SignupPage);
export { connectedSignupPage as SignupPage };

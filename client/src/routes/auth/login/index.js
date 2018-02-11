import React from 'react';
import { connect } from 'react-redux';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

import { userActions } from '../../../_actions';
import { bindActionCreators } from 'redux';

import './login.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <ValidatorForm ref="form"
                       onSubmit={this.handleSubmit}>
          <Card className="login-form">
            <CardHeader title="Login">
            </CardHeader>
            <CardContent>
              <TextValidator
                id="username"
                name="username"
                label="Username"
                value={username}
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
              <Button size="small">Sign up</Button>
              <div className="flex-fill"/>
            </CardActions>
          </Card>
        </ValidatorForm>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  login: userActions.login
}, dispatch);

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export { connectedLoginPage as LoginPage };

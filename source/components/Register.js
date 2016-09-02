/**
 * Created by Jan on 24.8.2016.
 */
/**
 * Created by Jan on 23.8.2016.
 */
import React from 'react';
import Relay from 'react-relay';

import registerMutation from '../mutations/registerMutation';

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      passwordAgain: '',
      error: ''
    }
  }

  handleFirstNameChange(e) {
    this.setState({ firstname: e.target.value })
  }
  handleLastNameChange(e) {
    this.setState({ lastname: e.target.value })
  }
  handleUsernameChange(e) {
    this.setState({ username: e.target.value })
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }
  handlePasswordAgainChange(e) {
    this.setState({ passwordAgain: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault();
    const firstname = this.state.firstname.trim();
    const lastname = this.state.lastname.trim();
    const username = this.state.username.trim();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const passwordAgain = this.state.passwordAgain.trim();
    if(firstname === '',
       lastname === '',
       username === '',
       email === '',
       password === '',
       passwordAgain === '') {
      this.setState({
        error: 'Please fill in all required data.'
      });
    } else if (password !== passwordAgain) {
      this.setState({
        error: 'Your passwords don\'t match',
        password: '',
        passwordAgain: ''
      });
    } else {
      Relay.Store.commitUpdate(
        new registerMutation({
          id: this.props.viewer.id,
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          password: password
        })
      );
      this.setState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        passwordAgain: '',
        error: ''
      });
    }
  }
  render() {
    return(
      <div>
        <p style={{color: 'red'}}>{this.state.error}</p>
        <form className="baseForm" onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            placeholder="Fist name"
            value={ this.state.firstname }
            onChange={ this.handleFirstNameChange.bind(this) }
          />
          <input
            type="text"
            placeholder="Last name"
            value={ this.state.lastname }
            onChange={ this.handleLastNameChange.bind(this) }
          />
          <input
            type="text"
            placeholder="Username"
            value={ this.state.username }
            onChange={ this.handleUsernameChange.bind(this) }
          />
          <input
            type="text"
            placeholder="Email"
            value={ this.state.email }
            onChange={ this.handleEmailChange.bind(this) }
          />
          <input
            type="text"
            placeholder="Password"
            value={ this.state.password }
            onChange={ this.handlePasswordChange.bind(this) }
          />
          <input
            type="text"
            placeholder="Password Again"
            value={ this.state.passwordAgain }
            onChange={ this.handlePasswordAgainChange.bind(this) }
          />
          <br />
          <input type="submit" value="Login"/>
        </form>
      </div>
    )
  }
}

export default Relay.createContainer(Register, {
  fragments: {
    viewer: () => Relay.QL`
        fragment on ViewerType{
          id
        }
      `
  }
});

/**
 * Created by Jan on 23.8.2016.
 */
import React from 'react';
import Relay from 'react-relay';

import NavLink from '../NavLink';

import login from './authFunction/login';

class Login extends React.Component {

  constructor() {
    super();
    this.state = { state: '', username: '', password: '' }
  }

  handleNameChange(e) {
    this.setState({ username: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    var username = this.state.username.trim();
    var password = this.state.password.trim();
    if (!username || !password){
      return;
    }
    const loginArgs =[this.props.loggedIn.id, username, password];
    login(...loginArgs);
    this.setState({ username: '', password: '' });
  }

  render() {
    return(
      <div className="login-slide">
        <form className="baseForm" onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            placeholder="User name"
            value={ this.state.username }
            onChange={ this.handleNameChange.bind(this) }
          />
          <input
            type="password"
            placeholder="Password"
            value={ this.state.password }
            onChange={ this.handlePasswordChange.bind(this) }
          />
          <br />
          <input type="submit" value="Login"/><br /><br />
          Or<br /><br />
          <NavLink to="/register" title="Register">Register</NavLink>
        </form>
      </div>
    )
  }
}

export default Relay.createContainer(Login, {
  fragments: {
    loggedIn: () => Relay.QL`
      fragment on LoggedInType{
        id
        user{
          firstname
          lastname
          username
          email
          role
        }
      }
    `
  }
});
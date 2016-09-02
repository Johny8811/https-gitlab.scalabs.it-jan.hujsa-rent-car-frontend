/**
 * Created by Jan on 23.8.2016.
 */
import React from 'react';
import Relay from 'react-relay';

import loginMutation from '../mutations/loginMutation';

class Login extends React.Component {
  constructor() {
    super();
    this.state = { username: '', password: '' }
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
    console.log(this.props.viewer.loggedIn);
    Relay.Store.commitUpdate(
      new loginMutation({
        id: this.props.viewer.loggedIn.id,
        username: username,
        password: password
      }), {
        onFailure: (transaction) => {
            console.log(transaction.getError().source);
          },
        onSuccess: (response) => {
            //console.log(response);
            localStorage.setItem("token", response.loginUser.loggedIn.token);
            //console.log(localStorage.getItem("firstname"));
          }
        }
      );

    console.log(this.state.username, this.state.password);
    this.setState({ username: '', password: '' });
  }
  render() {
    console.log(this.props.viewer.loggedIn);
    console.log(localStorage.getItem("token"));

    return(
      <div>
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
          <input type="submit" value="Login"/>
        </form>
      </div>
    )
  }
}

export default Relay.createContainer(Login, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on ViewerType{
        id
        loggedIn {
          id
          firstname
          lastname
          username
          email
          role
          token
        }
      }
    `
  }
});

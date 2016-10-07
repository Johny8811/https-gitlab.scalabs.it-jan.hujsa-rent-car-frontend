/**
 * Created by Jan on 24.8.2016.
 */
/**
 * Created by Jan on 23.8.2016.
 */
import React from 'react';
import Relay from 'react-relay';
import { Form } from 'formsy-react';

import registerMutation from '../../mutations/registerMutation.jsx';
import Input from '../formsy/component/Input.jsx';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      submit: false
    }
  }

  enableSubmit() {
    this.setState({ submit: true });
  }

  disableSubmit() {
    this.setState({ submit: false });
  }

  handleSubmit() {
    const data = this.form.getModel();
    console.log(data);
    const first_name = data.first_name.trim();
    const last_name = data.last_name.trim();
    const username = data.username.trim();
    const email = data.email.trim();
    const password = data.password.trim();

    Relay.Store.commitUpdate(
      new registerMutation({
        id: this.props.viewer.id,
        firstname: first_name,
        lastname: last_name,
        username,
        email,
        password
      }), {
        onFailure: (transaction) => {
          const error = transaction.getError().source.errors[0].message;
          this.form.updateInputsWithError({
            email: error
          });
        },
        onSuccess: () => {
          this.form.reset({
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            password_again: ''
          });
        }
      }
    );
  }
  render() {
    return(
      <div>
        <Form
          ref={ form => this.form = form }
          className="baseForm"
          onSubmit={ () => this.handleSubmit() }
          onValid={ () => this.enableSubmit() }
          onInvalid={ () => this.disableSubmit() }
        >
          <Input
            name="first_name"
            placeholder="Fist name"
          />
          <Input
            name="last_name"
            placeholder="Last name"
          />
          <Input
            name="username"
            placeholder="Username"
            required
          />
          <Input
            name="email"
            placeholder="Email"
            validations="isEmail"
            validationError="Type valid e-mail"
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <Input
            name="password_again"
            type="password"
            placeholder="Password Again"
            validations="equalsField:password"
            validationError="Password don't match"
            required
          />
          <br />
          <br />
          <input type="submit" value="Register" disabled={ !this.state.submit } />
        </Form>
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


//constructor() {
//  super();
//  this.state = {
//    firstname: '',
//    lastname: '',
//    username: '',
//    email: '',
//    password: '',
//    passwordAgain: '',
//    error: ''
//  }
//}
//
//handleFirstNameChange(e) {
//  this.setState({ firstname: e.target.value })
//}
//handleLastNameChange(e) {
//  this.setState({ lastname: e.target.value })
//}
//handleUsernameChange(e) {
//  this.setState({ username: e.target.value })
//}
//handleEmailChange(e) {
//  this.setState({ email: e.target.value })
//}
//handlePasswordChange(e) {
//  this.setState({ password: e.target.value })
//}
//handlePasswordAgainChange(e) {
//  this.setState({ passwordAgain: e.target.value })
//}
//handleSubmit(e) {
//  e.preventDefault();
//  const firstname = this.state.firstname.trim();
//  const lastname = this.state.lastname.trim();
//  const username = this.state.username.trim();
//  const email = this.state.email.trim();
//  const password = this.state.password.trim();
//  const passwordAgain = this.state.passwordAgain.trim();
//  if(firstname === '',
//    lastname === '',
//    username === '',
//    email === '',
//    password === '',
//    passwordAgain === '') {
//    this.setState({
//      error: 'Please fill in all required data.'
//    });
//  } else if (password !== passwordAgain) {
//    this.setState({
//      error: 'Your passwords don\'t match',
//      password: '',
//      passwordAgain: ''
//    });
//  } else {
//    Relay.Store.commitUpdate(
//      new registerMutation({
//        id: this.props.viewer.id,
//        firstname: firstname,
//        lastname: lastname,
//        username: username,
//        email: email,
//        password: password
//      })
//    );
//    this.setState({
//      firstname: '',
//      lastname: '',
//      username: '',
//      email: '',
//      password: '',
//      passwordAgain: '',
//      error: ''
//    });
//  }

//<form className="baseForm" onSubmit={this.handleSubmit.bind(this)}>
//  <input
//    type="text"
//    placeholder="Fist name"
//    value={ this.state.firstname }
//    onChange={ this.handleFirstNameChange.bind(this) }
//  />
//  <input
//    type="text"
//    placeholder="Last name"
//    value={ this.state.lastname }
//    onChange={ this.handleLastNameChange.bind(this) }
//  />
//  <input
//    type="text"
//    placeholder="Username"
//    value={ this.state.username }
//    onChange={ this.handleUsernameChange.bind(this) }
//  />
//  <input
//    type="text"
//    placeholder="Email"
//    value={ this.state.email }
//    onChange={ this.handleEmailChange.bind(this) }
//  />
//  <input
//    type="text"
//    placeholder="Password"
//    value={ this.state.password }
//    onChange={ this.handlePasswordChange.bind(this) }
//  />
//  <input
//    type="text"
//    placeholder="Password Again"
//    value={ this.state.passwordAgain }
//    onChange={ this.handlePasswordAgainChange.bind(this) }
//  />
//  <br />
//  <input type="submit" value="Register"/>
//</form>

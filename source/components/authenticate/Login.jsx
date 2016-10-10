/**
 * Created by Jan on 23.8.2016.
 */
import React from 'react';
import Relay from 'react-relay';
import { Form } from 'formsy-react';
import Link from '../common/NavLink.jsx';

import loginMutation from '../../mutations/loginMutation.jsx';
import Input from '../formsy/component/Input.jsx';


class Login extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = { submit: false }
  }

    enableSubmit() {
      this.setState({ submit: true });
    }

    disableSubmit() {
      this.setState({ submit: false });
    }

  handleSubmit() {
    const data = this.form.getModel();

    const username = data.username.trim();
    const password = data.password.trim();

    Relay.Store.commitUpdate(
      new loginMutation({
        loggedIn: this.props.viewer.loggedIn.id,
        username: username,
        password: password
      }), {
        onFailure: (transaction) => {
          const error = transaction.getError().source.errors[0].message;
          if (error.search('username') === 10) {
            this.form.updateInputsWithError({
              username: error
            })
          } else {
            this.form.updateInputsWithError({
              password: error
            })
          }
        },
        onSuccess: (response) => {
          localStorage.setItem("token", response.loginUser.token);
          this.form.reset({
            username: '',
            password: ''
          });
          this.context.router.push('/');
        }
      }
    );
  }

  render() {
    return(
      <div className="login">
        <Form
          ref={ form => { this.form = form } }
          className="baseForm"
          onSubmit={ () => this.handleSubmit() }
          onValid={ () => this.enableSubmit() }
          onInvalid={ () => this.disableSubmit() }
        >
          <Input
            name="username"
            placeholder="username"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="password"
            required
          /><br /><br />
          <input type="submit" value="login" disabled={!this.state.submit} />
          <br />
          or
          <br />
          <Link to="register">Register</Link>
        </Form>
      </div>
    )
  }
}

Login.propTypes = {
  viewer: React.PropTypes.object
};

export default Relay.createContainer(Login, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on ViewerType{
        id
        loggedIn{
        id
        user{
          firstname
          lastname
          username
          email
          role
        }
        }
      }
    `
  }
});


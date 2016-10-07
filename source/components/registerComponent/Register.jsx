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
import Input from '../formsy/component/Input.jsx' ;

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
          ref={ form => (this.form = form) }
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

Register.propTypes = {
  viewer: React.PropTypes.object
};

export default Relay.createContainer(Register, {
  fragments: {
    viewer: () => Relay.QL`
        fragment on ViewerType{
          id
        }
      `
  }
});

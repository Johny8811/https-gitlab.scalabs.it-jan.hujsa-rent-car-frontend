/**
 * Created by Jan on 23.8.2016.
 */
import Relay from 'react-relay';

export default class LoginMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation { loginUser }`;
  }

  getVariables() {
    return {
      username: this.props.username,
      password: this.props.password
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on LoginPayload {
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

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        loggedIn: this.props.id
      }
    }];
  }
}

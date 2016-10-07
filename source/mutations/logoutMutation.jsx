/**
 * Created by Jan on 23.8.2016.
 */
import Relay from 'react-relay';

export default class LogoutMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation { logoutUser }`;
  }

  getVariables() {
    return {
      id: this.props.loggedIn
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on LogoutPayload {
        loggedOut {
          id
          user
        }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        loggedOut: this.props.loggedIn
      }
    }];
  }
}

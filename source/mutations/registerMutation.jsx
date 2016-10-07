/**
 * Created by Jan on 16.8.2016.
 */
import Relay from 'react-relay';

export default class AddBikeMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { registerUser }`;
  }

  getVariables() {
    return {
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      username: this.props.username,
      email: this.props.email,
      password: this.props.password
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RegisterPayload {
        userEdge
        viewer {
          users
        }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.id,
      connectionName: 'users',
      edgeName: 'userEdge',
      rangeBehaviors: {
        '': 'ignore'
      }
    }];
  }
}
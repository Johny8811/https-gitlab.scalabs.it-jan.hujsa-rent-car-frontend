/**
 * Created by Jan on 16.8.2016.
 */
import Relay from 'react-relay';

export default class AddBikeMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation { addBike }`;
  }

  getVariables() {
    return {
      brand: this.props.brand,
      volume: this.props.volume,
      maxSpeed: this.props.maxSpeed
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddBikePayload {
        bikeEdge
        viewer {
          bikes
        }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.id,
      connectionName: 'bikes',
      edgeName: 'bikeEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
  }
}
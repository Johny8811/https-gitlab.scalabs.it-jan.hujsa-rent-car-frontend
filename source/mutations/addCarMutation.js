/**
 * Created by Jan on 16.8.2016.
 */
import Relay from 'react-relay';

export default class AddCarMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { addCar }`;
  }

  getVariables() {
    return {
      brand: this.props.brand,
      power: this.props.power,
      carCode: this.props.carCode
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddCarPayload {
        carEdge
        viewer {
          cars
        }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.id,
      connectionName: 'cars',
      edgeName: 'carEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
  }
}
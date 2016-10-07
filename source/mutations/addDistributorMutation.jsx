/**
 * Created by Jan on 16.8.2016.
 */
import Relay from 'react-relay';

export default class AddDistributorMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { addDistributor }`;
  }

  getVariables() {
    return {
      brand: this.props.brand,
      power: this.props.distributor,
      carCode: this.props.carCode
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddDistributorPayload {
        distributorEdge
        viewer {
          distributor
        }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.id,
      connectionName: 'allDistributors',
      edgeName: 'distributorEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
  }
}
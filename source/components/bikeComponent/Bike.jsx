/**
 * Created by Jan on 10.8.2016.
 */
import React from 'react';
import Relay from 'react-relay';

import AddBikeFormComponent from './AddBikeFormComponent.jsx';

class Bike extends React.Component {
  loggedInUser() {
    const user = this.props.viewer.loggedIn.user;
    if (user.role === 'admin') {
      return <AddBikeFormComponent viewer={this.props.viewer} />;
    }
    return false;
  }
  render() {
    console.log(this.viewer);
    var bikes =  this.props.viewer.bikes.edges.map((bike) => (
      <tr key={ bike.node.id }>
        <td>{ bike.node.brand }</td>
        <td>{ bike.node.volume }</td>
        <td>{ bike.node.maxSpeed }</td>
      </tr>
      )
    );
    return (
      <div>
        <table id="table">
          <tbody>
            <tr>
              <th>Znacka</th>
              <th>Objem</th>
              <th>Max Speed</th>
            </tr>
            {bikes}
          </tbody>
        </table>
        {this.loggedInUser()}
      </div>
    )
  }
}

Bike.propTypes = {
  viewer: React.PropTypes.object
};

export default Relay.createContainer(Bike, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on ViewerType{
          loggedIn{
            user{
              id
              firstname
              lastname
              username
              role
              email
            }
          }
          bikes(first: 999) {
            edges{
              node{
                id
                brand
                volume
                maxSpeed
              }
            }
          }
          ${AddBikeFormComponent.getFragment('viewer')}
        }
      `
    }
});

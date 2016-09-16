/**
 * Created by Jan on 9.8.2016.
 */
import React from 'react';
import Relay from 'react-relay';

import AddCarFormComponent from './AddCarFormComponent';

class Car extends React.Component {
  loggedInUser() {
    const user = this.props.viewer.loggedIn.user;
    if (user.role == 'admin') {
      return <AddCarFormComponent viewer={this.props.viewer} />;
    }
  }
  render() {
    var cars = this.props.viewer.cars.edges.map((car) => {
      return (
        <tr key={car.node.id}>
          <td>{car.node.brand}</td>
          <td>{car.node.power}</td>
          <td>{car.node.distributor.map(dist => {
              return (
                <span key={dist.__dataID__}>
                  {dist.distributor + " "}
                </span>
              )
          })}</td>
        </tr>
      )
    });
    return (
      <div>
        <table id="table">
          <tbody>
            <tr>
              <th>Znacka</th>
              <th>Výkon</th>
              <th>Dodavatel</th>
            </tr>
            {cars}
          </tbody>
        </table>
        {this.loggedInUser()}
      </div>
    )
  }
}

export default Relay.createContainer(Car, {
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
        cars(first: 2222) {
          edges{
            node{
              id
              brand
              power
              distributor {
                distributor
              }
            }
          }
        }
        ${AddCarFormComponent.getFragment('viewer')}
      }
    `
  }
});


/**
 * Created by Jan on 10.8.2016.
 */
import React from 'react';
import Relay from 'react-relay';

import AddBikeFormComponent from './AddBikeFormComponent';

class Bike extends React.Component {
  loggedInUser() {
    const user = this.props.viewer.loggedIn.user;
    if (user.role == 'admin') {
      return <AddBikeFormComponent viewer={this.props.viewer} />;
    }
  }
  render() {
    var bikes =  this.props.viewer.bikes.edges.map((bike) => {
      return (
        <tr key={ bike.node.id }>
          <td>{ bike.node.brand }</td>
          <td>{ bike.node.volume }</td>
          <td>{ bike.node.maxSpeed }</td>
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
            {bikes}
          </tbody>
        </table>
        {this.loggedInUser()}
      </div>
    )
  }
}

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

//constructor() {
//  super();
//  this.state = { brand: '',volume : '', maxSpeed: '' };
//}
//handleBrandChange(e) {
//  this.setState({ brand: e.target.value })
//}
//handleVolumeChange(e) {
//  this.setState({ volume: e.target.value })
//}
//handleMaxSpeedChange(e) {
//  this.setState({ maxSpeed: e.target.value })
//}
//handleSubmit(e) {
//  e.preventDefault();
//  var brand = this.state.brand.trim();
//  var volume = this.state.volume.trim();
//  var maxSpeed = this.state.maxSpeed.trim();
//  if (!brand || !volume || ! maxSpeed){
//    return;
//  }
//  Relay.Store.commitUpdate(
//    new addBikeMutation({
//      id: this.props.viewer.id,
//      brand: brand,
//      volume: volume,
//      maxSpeed: maxSpeed
//    })
//  );
//  this.setState({ brand: '', volume: '', maxSpeed: '' });
//}

//<form className="baseForm" onSubmit={this.handleSubmit.bind(this)}>
//  <input
//    type="text"
//    placeholder="Brand of bike"
//    value={this.state.brand}
//    onChange={this.handleBrandChange.bind(this)}
//  />
//  <input
//    type="number"
//    placeholder="Volume of bike"
//    value={this.state.volume}
//    onChange={this.handleVolumeChange.bind(this)}
//  />
//  <input
//    type="text"
//    placeholder="Max speed of bike"
//    value={this.state.maxSpeed}
//    onChange={this.handleMaxSpeedChange.bind(this)}
//  />
//  <br />
//  <input type="submit" value="Add Bike"/>
//</form>

/**
 * Created by Jan on 9.8.2016.
 */
import React from 'react';
import Relay from 'react-relay';

import addCarMutation from '../mutations/addCarMutation';

class Car extends React.Component {
  constructor() {
    super();
    this.state = {brand: '', power: '', carCode: ''};
  }
  handleBrandChange(e) {
    this.setState({brand: e.target.value})
  }
  handlePowerChange(e) {
    this.setState({power: e.target.value})
  }
  handleCarCodeChange(e) {
    this.setState({carCode: e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault();
    var brand = this.state.brand.trim();
    var power = this.state.power.trim();
    var carCode = this.state.carCode.trim();
    if (!brand || !power || ! carCode){
      return;
    }
    Relay.Store.commitUpdate(
      new addCarMutation({
        id: this.props.viewer.id,
        brand: brand,
        power: power,
        carCode: carCode
      })
    );
    this.setState({brand: '', power: '', carCode: ''});
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
        <form className="baseForm" onSubmit={this.handleSubmit.bind(this)}>
          <input
            name="brand"
            type="text"
            placeholder="Brand of car"
            value={this.state.brand}
            onChange={this.handleBrandChange.bind(this)}
          />
          <input
            name="power"
            type="text"
            placeholder="Power of car"
            value={this.state.power}
            onChange={this.handlePowerChange.bind(this)}
          />
          <input
            name="carCode"
            type="number"
            placeholder="Car code of vehicle"
            value={this.state.carCode}
            onChange={this.handleCarCodeChange.bind(this)}
          />
          <br />
          <input type="submit" value="Add Vehicle"/>
        </form>
      </div>
    )
  }
}

export default Relay.createContainer(Car, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on ViewerType{
        id
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
      }
    `
  }
});


/**
 * Created by Jan on 14.9.2016.
 */
import React from 'react';
import Relay from 'react-relay';

import addCarMutation from '../../mutations/addCarMutation';

class AddCarFormComponent extends React.Component {
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
    return(
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
    )
  }
}

export default Relay.createContainer(AddCarFormComponent, {
  fragments: {
    viewer:() => Relay.QL`
      fragment on ViewerType{
        id
      }
    `
  }
})
/**
 * Created by Jan on 14.9.2016.
 */
import React from 'react';
import Relay from 'react-relay';
import { Form } from 'formsy-react';

import addCarMutation from '../../mutations/addCarMutation.jsx';
import Input from '../formsy/component/Input.jsx';

class AddCarFormComponent extends React.Component {

  constructor() {
    super();
    this.state = { submit: false };
  }

  enableSubmit() {
    this.setState({ submit: true });
  }

  disableSubmit() {
    this.setState({ submit: false });
  }

  handleSubmit() {
    const data = this.form.getModel();

    const brand = data.brand.trim();
    const power = data.power.trim();
    const carCode = data.carCode.trim();

    Relay.Store.commitUpdate(
      new addCarMutation({
        id: this.props.viewer.id,
        brand: brand,
        power: power,
        carCode: carCode
      }), {
        onSuccess: () => {
          this.form.reset({
            brand: '',
            power: '',
            carCode: ''
          });
        }
      }
    );
  }
  render() {
    return(
      <Form
        ref={ form => { this.form = form; } }
        className="base-form"
        onSubmit={ () => this.handleSubmit() }
        onValid={ () => this.enableSubmit() }
        onInvalid={ () => this.disableSubmit() }
      >
        <Input
          name="brand"
          placeholder="brand of car"
          required
        />
        <Input
          name="power"
          placeholder="power of car"
          required
        />
        <Input
          name="carCode"
          type="number"
          placeholder="car code of vehicle"
          required
        />
        <input type="submit" value="dd Vehicle" disabled={!this.state.submit}/>
      </Form>
    )
  }
}

AddCarFormComponent.propTypes = {
  viewer: React.PropTypes.object
};

export default Relay.createContainer(AddCarFormComponent, {
  fragments: {
    viewer:() => Relay.QL`
      fragment on ViewerType{
        id
      }
    `
  }
})

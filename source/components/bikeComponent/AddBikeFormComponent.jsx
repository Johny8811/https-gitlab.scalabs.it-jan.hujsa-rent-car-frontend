/**
 * Created by Jan on 13.9.2016.
 */
import React from 'react';
import Relay from 'react-relay';
import { Form } from 'formsy-react';

import addBikeMutation from '../../mutations/addBikeMutation.jsx';
import Input from '../formsy/component/Input.jsx';

class AddBikeFormComponent extends React.Component {

  constructor() {
    super();
    this.state = { submit: false }
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
    const volume = data.volume.trim();
    const maxSpeed = data.maxSpeed.trim();

    Relay.Store.commitUpdate(
      new addBikeMutation({
        id: this.props.viewer.id,
        brand: brand,
        volume: volume,
        maxSpeed: maxSpeed
      }), {
        onSuccess: () => {
          this.form.reset({
            brand: '',
            volume: '',
            maxSpeed: ''
          });
        }
      }
    );
  }
  render() {
    return(
      <Form
        ref={ form => { this.form = form; } }
        className="base-form add"
        onSubmit={ () => this.handleSubmit() }
        onValid={ () => this.enableSubmit() }
        onInvalid={ () => this.disableSubmit() }
      >
        <Input
          name="brand"
          placeholder="brand of bike"
          required
        />
        <Input
          name="volume"
          type="number"
          placeholder="volume of bike"
          required
        />
        <Input
          name="maxSpeed"
          placeholder="max speed of bike"
          required
        />
        <input type="submit" value="add Bike" disabled={!this.state.submit} />
      </Form>
    )
  }
}

AddBikeFormComponent.propTypes = {
  viewer: React.PropTypes.object
};

export default Relay.createContainer(AddBikeFormComponent, {
  fragments: {
    viewer:() => Relay.QL`
      fragment on ViewerType{
        id
      }
    `
  }
})

/**
 * Created by Jan on 10.8.2016.
 */
import React from 'react';
import Relay from 'react-relay';

class Bike extends React.Component {
    render() {
        var viewer = this.props.viewer;
        return (
            <div>
                <table id="table">
                    <tbody>
                        <tr>
                            <th>Znacka</th>
                            <th>Výkon</th>
                            <th>Dodavatel</th>
                        </tr>
                        <tr>
                            <td>{viewer.bikes[0].brand}</td>
                            <td>{viewer.bikes[0].volume}</td>
                            <td>{viewer.bikes[0].maxSpeed}</td>
                        </tr>
                        <tr>
                            <td>{viewer.bikes[1].brand}</td>
                            <td>{viewer.bikes[1].volume}</td>
                            <td>{viewer.bikes[1].maxSpeed}</td>
                        </tr>
                        <tr>
                            <td>{viewer.bikes[2].brand}</td>
                            <td>{viewer.bikes[2].volume}</td>
                            <td>{viewer.bikes[2].maxSpeed}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Relay.createContainer(Bike, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on ViewerType{
                id
                bikes {
                        brand
                        volume
                        maxSpeed
                    }
            }
        `
    }
});
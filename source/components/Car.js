/**
 * Created by Jan on 9.8.2016.
 */
import React from 'react';
import Relay from 'react-relay';

class Car extends React.Component {
    render() {
        var viewer = this.props.viewer;
        console.log(viewer);
        //var i;
        //var t;
        //for (i=0; i < viewer.cars.length; i++) {
        //    t = "<td>" + viewer.cars[i].brand + "</td></tr>" +
        //    "<tr><td>" + viewer.cars[i].power + "</td></tr>" +
        //    "<tr><td>" + viewer.cars[i].distributor[0].distributor + "</td>"
        //}
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
                            <td>{viewer.cars[0].brand}</td>
                            <td>{viewer.cars[0].power}</td>
                            <td>{viewer.cars[0].distributor[0].distributor}</td>
                        </tr>
                        <tr>
                            <td>{viewer.cars[1].brand}</td>
                            <td>{viewer.cars[1].power}</td>
                            <td>{viewer.cars[1].distributor[0].distributor}</td>
                        </tr>
                        <tr>
                            <td>{viewer.cars[2].brand}</td>
                            <td>{viewer.cars[2].power}</td>
                            <td>{viewer.cars[2].distributor[0].distributor}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Relay.createContainer(Car, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on ViewerType{
                id
                cars {
                        id
                        brand
                        power
                        distributor {
                                distributor
                            }
                    }
            }
        `
    }
});


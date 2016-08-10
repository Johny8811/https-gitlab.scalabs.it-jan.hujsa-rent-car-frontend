/**
 * Created by Jan on 9.8.2016.
 */
import React from 'react';
import NavLink from './NavLink';

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <h1><NavLink to="/" className="home">Rent a Car</NavLink></h1>
                <nav>
                    <li><NavLink to="/cars"><img src="../../asset/images/lambo.jpg"/></NavLink></li>
                    <li><NavLink to="/bikes"><img src="../../asset/images/motorka.jpg"/></NavLink></li>
                </nav>
                {this.props.children}
            </div>
        )
    }
}
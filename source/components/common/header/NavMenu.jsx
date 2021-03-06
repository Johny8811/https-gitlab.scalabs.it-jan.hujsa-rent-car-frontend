/**
 * Created by Jan on 12.9.2016.
 */
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

import NavLink from '../NavLink.jsx';

import RightSide from './RightSide.jsx';

class NavMenu extends React.Component {

  link(loggedIn) {
    const user = loggedIn.user;
    if (user.role === 'guest') {
      return(
        <Link to="/login">
          <img className="img-30" src="../../../asset/images/avatar.png" alt="Login" />
        </Link>
      );
    }
    return <RightSide loggedIn={loggedIn.id} />
  }
  render() {
    return(
      <div className="navigation ">
        <h1><NavLink to="/" className="home">Rent a Car</NavLink></h1>
        <nav className="side">
          {this.link(this.props.loggedIn)}
        </nav>
        <nav className="main">
          <li>
            <NavLink to="/cars">
              <img src="../../../asset/images/lambo.jpg" alt="Cars" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/bikes">
              <img src="../../../asset/images/motorka.jpg" alt="Bikes" />
            </NavLink>
          </li>
        </nav>
      </div>
    )
  }
}

NavMenu.propTypes = {
  loggedIn: React.PropTypes.object
};

export default Relay.createContainer(NavMenu, {
  fragments: {
    loggedIn: () => Relay.QL`
      fragment on LoggedInType{
        id
        user{
          firstname
          lastname
          username
          email
          role
        }
      }
    `
  }
})

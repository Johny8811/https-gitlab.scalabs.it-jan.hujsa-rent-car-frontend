/**
 * Created by Jan on 12.9.2016.
 */
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

import NavLink from '../../NavLink.jsx';

import RightSide from './RightSide.jsx';

class NavMenu extends React.Component {

  link(loggedIn) {
    const user = loggedIn.user;
    if (user.role == 'guest') {
      return <Link to="/login"><img src="../../../asset/images/avatar.png" /></Link>;

    }
    else {
      return <RightSide loggedIn={loggedIn.id} />
    }
  }
  render() {
    return(
      <div>
        <h1><NavLink to="/" className="home">Rent a Car</NavLink></h1>
        <nav id="side">
          {this.link(this.props.loggedIn)}
        </nav>
        <nav id="main">
          <li><NavLink to="/cars"><img src="../../../asset/images/lambo.jpg"/></NavLink></li>
          <li><NavLink to="/bikes"><img src="../../../asset/images/motorka.jpg"/></NavLink></li>
        </nav>
      </div>
    )
  }
}

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
//return <Link to="/login"><img src="../../../asset/images/avatar.png" /></Link>;
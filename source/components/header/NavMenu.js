/**
 * Created by Jan on 12.9.2016.
 */
import React from 'react';
import Relay from 'react-relay';
import $ from 'jquery';

import NavLink from '../NavLink';

import RightSide from './RightSide';


import jQuery from '../../jquery/jQuery';


class NavMenu extends React.Component {
   slide() {
    $(document).ready(() => {      // tento kus jQuery presunut do vlastneho file, aby bolo mozne volat ju odkialkolvek
      if ($(".login-slide").css("right") != "0px"){
        $("#children").animate({"right": "100%"}, 400);
        $(".login-slide").animate({"right": "0%"}, 400);
      } else {
         $("#children").animate({"right": "0%"}, 400);
         $(".login-slide").animate({"right": "-100%"}, 400);
      }
    })
  };

  link(loggedIn) {
    const user = loggedIn.user;
    if (user.role == 'guest') {
      return <img id="login" onClick={this.slide} src="../../../asset/images/avatar.png" />;
    }
    else {
      return <RightSide loggedIn={loggedIn.id} />
    }
  }
  render() {
    return(
      <span>
        <h1><NavLink to="/" className="home">Rent a Car</NavLink></h1>
        <nav id="side">
          {this.link(this.props.loggedIn)}
        </nav>
        <nav id="main">
          <li><NavLink to="/cars"><img src="../../../asset/images/lambo.jpg"/></NavLink></li>
          <li><NavLink to="/bikes"><img src="../../../asset/images/motorka.jpg"/></NavLink></li>
        </nav>
      </span>
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
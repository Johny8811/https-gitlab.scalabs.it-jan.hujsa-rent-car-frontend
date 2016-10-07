/**
 * Created by Jan on 23.8.2016.
 */
import React from 'react';
import Relay from 'react-relay';

import logout from './../../authenticate/authFunction/logout.jsx';

export default class DropDown extends React.Component {

  logout() {
    const loggedInID = this.props.loggedInID;
    logout(loggedInID);
  }

  render() {
    return(
      <div className="dropdown">
        <li title="Profile" ><img src="../../asset/images/settings.png" /></li>
        <li title="Logout" onClick={this.logout.bind(this)}><img src="../../asset/images/logout.png" /></li>
      </div>
    )
  }
}


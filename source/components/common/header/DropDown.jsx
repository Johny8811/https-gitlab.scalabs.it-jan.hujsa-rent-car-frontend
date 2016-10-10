/**
 * Created by Jan on 23.8.2016.
 */
import React from 'react';

import logout from './../../authenticate/authFunction/logout.jsx';

export default class DropDown extends React.Component {

  logout() {
    const loggedInID = this.props.loggedInID;
    logout(loggedInID);
  }

  render() {
    return(
      <div className="dropdown">
        <li title="Profile" >
          <img className="img-30" src="../../asset/images/settings.png" alt="Profile"
          />
        </li>
        <li title="Logout" onClick={ () => this.logout() }>
          <img className="img-30" src="../../asset/images/logout.png" alt="Logout" />
        </li>
      </div>
    )
  }
}

DropDown.propTypes = {
  loggedInID: React.PropTypes.string
};

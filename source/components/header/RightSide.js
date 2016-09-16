/**
 * Created by Jan on 12.9.2016.
 */
import React from 'react';

import NavLink from '../NavLink';

import DropDown from './DropDown';

export default class RightSide extends React.Component {
  render() {
    return(
      <span>
        <div id="led"></div>
        <img  id="login" src="../../../asset/images/avatar.png" />
        <DropDown loggedInID={this.props.loggedIn}/>
      </span>
    )
  }
}

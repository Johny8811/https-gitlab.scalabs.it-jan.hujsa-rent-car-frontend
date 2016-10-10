/**
 * Created by Jan on 12.9.2016.
 */
import React from 'react';
import ReactCSSTransitionGrou from 'react-addons-css-transition-group';

import DropDown from './DropDown.jsx';

export default class RightSide extends React.Component {
  constructor() {
    super();
    this.state = { dropDown: false };
  }

  toggleDropDown() {
    this.setState({ dropDown: !this.state.dropDown });
  }

  render() {
    return(
      <div>
        <div id="led"></div>
        <img
          className="img-30"
          onClick={ () => this.toggleDropDown() }
          src="../../../asset/images/avatar.png"
          alt="Dropdown"
        />
        <ReactCSSTransitionGrou
          transitionName="dropDown"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          { this.state.dropDown && <DropDown loggedInID={this.props.loggedIn}/> }
        </ReactCSSTransitionGrou>
      </div>
    )
  }
}

RightSide.propTypes = {
  loggedIn: React.PropTypes.object
};

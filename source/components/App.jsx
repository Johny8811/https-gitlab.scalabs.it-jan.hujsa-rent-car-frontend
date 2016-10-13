/**
 * Created by Jan on 9.8.2016.
 */
import React from 'react';
import Relay from 'react-relay';

import NavMenu from './common/header/NavMenu.jsx';
import '../css/style.sass';

const App = (props) => (
  <div className="app">
    <NavMenu loggedIn={props.viewer.loggedIn} />
    <div className="children">{props.children}</div>
  </div>
);


App.propTypes = {
  viewer: React.PropTypes.object,
  loggedIn: React.PropTypes.object,
  children: React.PropTypes.node
};

export default Relay.createContainer(App, {
    fragments: {
        viewer: () => Relay.QL`
          fragment on ViewerType{
            id
            loggedIn {
              user{
                role
              }
              ${NavMenu.getFragment('loggedIn')}
            }
          }
        `
    }
});

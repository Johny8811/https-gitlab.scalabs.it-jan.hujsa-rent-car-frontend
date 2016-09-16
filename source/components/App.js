/**
 * Created by Jan on 9.8.2016.
 */
import React from 'react';
import Relay from 'react-relay';

import NavMenu from './header/NavMenu';
import Login from './authenticate/Login';

export default class App extends React.Component {
  render() {
    sessionStorage.setItem("cuttentPath", this.props.location.pathname);
    return (
      <div className="app">
        <NavMenu loggedIn={this.props.viewer.loggedIn} />

          <Login loggedIn={this.props.viewer.loggedIn} />
          <div id="children">{this.props.children}</div>

      </div>
    )
  }
}

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
              ${Login.getFragment('loggedIn')}
            }
          }
        `
    }
});


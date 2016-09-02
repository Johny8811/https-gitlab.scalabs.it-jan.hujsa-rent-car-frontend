/**
 * Created by Jan on 7.8.2016.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {
    Router,
    Route,
    browserHistory,
    IndexRoute,
    applyRouterMiddleware,
    Link
} from 'react-router';
import useRelay from 'react-router-relay';

import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Car from './components/Car';
import Bike from './components/Bike';

const ViewerQueries = {
    viewer: () => Relay.QL` query { viewer } `
};

function token() {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  } else {
    return;
  }
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:2020/graphql', {
    headers: {
      token: token()
    }
  })
);

ReactDOM.render(
    <Router history={browserHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/login" component={Login} queries={ViewerQueries}/>
        <Route path="/register" component={Register} queries={ViewerQueries}/>
        <Route path="/cars" component={Car} queries={ViewerQueries}/>
        <Route path="/bikes" component={Bike} queries={ViewerQueries}/>
      </Route>
    </Router>,
    document.getElementById('content')
);







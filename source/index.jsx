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
    applyRouterMiddleware
} from 'react-router';
import useRelay from 'react-router-relay';

import App from './components/App.jsx';
import Home from './components/homeComponent/Home.jsx';
import Login from './components/authenticate/Login.jsx';
import Register from './components/registerComponent/Register.jsx';
import Car from './components/carComponent/Car.jsx';
import Bike from './components/bikeComponent/Bike.jsx';

const ViewerQueries = {
    viewer: () => Relay.QL` query { viewer } `
};

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/graphql', {
    credentials: 'same-origin',
    headers: {
      token: localStorage.getItem("token")
    }
  })
);

ReactDOM.render(
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  >
    <Route path="/" component={App} queries={ViewerQueries}>
      <IndexRoute component={Home}/>
      <Route path="/login" component={Login} queries={ViewerQueries}/>
      <Route path="/register" component={Register} queries={ViewerQueries}/>
      <Route path="/cars" component={Car} queries={ViewerQueries}/>
      <Route path="/bikes" component={Bike} queries={ViewerQueries}/>
    </Route>
  </Router>,
  document.getElementById('content')
);



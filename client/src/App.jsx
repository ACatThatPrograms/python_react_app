import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { mapAllStatesToProps, mapAllDispatchesToProps } from 'redux/helpers/main.js';
import 'semantic-ui-css/semantic.min.css';
import './style/main.scss';
// Api
import Api from 'api/api'

/* Major Components */
// import Navigation from './components/Navigation/Navigation';
import BgImageHandler from './components/BgImageHandler/BgImageHandler';

/* Pages */
import Lander from 'pages/Lander/Lander';
import Profile from 'pages/Profile/Profile';

class App extends Component  {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount() {
    Api.getAccount(this.props)
  }

  render () {

    return (

      <Router>
        <Route exact path="/" component={Lander}/>
        <AuthRoute clientState={this.props.state_client} exact path="/profile" component={Profile}/>
        <BgImageHandler/>
      </Router>

    );
  }
}

function AuthRoute(props) {
  console.log(props)
  return props.clientState.loggedIn ? <Route {...props} /> : <Redirect to='/' />
}

export default connect(mapAllStatesToProps, mapAllDispatchesToProps)(App);

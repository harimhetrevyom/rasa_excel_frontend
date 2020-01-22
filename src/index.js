import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import RasaPredictor from './Component/RasaPredictor'
import SignUp from './Component/SignUp'
import SignIn from './Component/Login'

const styles = {
  root: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none',
    paddingTop: '25px',
    color: '#FFFFFF'
  }
};

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/RasaPredictor" component={RasaPredictor} />
        <Route exact path="/SignUp" component={SignUp}/>
        <Route exact path="/SignIn" component={SignIn}/>
      </div>
    </Router>
  )

  ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

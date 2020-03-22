import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LoginComponent from './login/Login';
import ForgotPassword from './login/ForgotPassword';
import SignUp from './login/SignUp';
import LandingPage from './landing';
import HeaderComponent from './components/Header';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <HeaderComponent/>
      <div className="app-container">
        <Switch>
          <Route path="/login">
            <LoginComponent isError={false}/>
          </Route>
          <Route path="/sign-up">
            <SignUp/>
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword/>
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;


// <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
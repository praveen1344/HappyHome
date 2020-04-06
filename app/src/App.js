// import React from 'react';
// import HappyLoft from './components/HappyLoftApp'
import React from 'react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  withRouter,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import LoginComponent from './login/Login';
import ForgotPassword from './login/ForgotPassword';
import SignUp from './login/SignUp';
import LandingPage from './landing';
import HeaderComponent from './components/Header';
import AboutUsPage from './components/AboutUsPage';
import ModalWindow from './common/ModalWindow';

//Admin page to showcase all tables within the application

import AdminPage from './admin/AdminPage';

import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user:{
        type: undefined
      },
      modalWindowProps:{
        isOpen: false,
        message: "",
        isSuccess: true,
        redirectLink: undefined
      }
    }
  }
  
  componentDidMount(){
    const userType = localStorage.getItem('user-type')
    const state = this.state;
    if (userType == undefined){
      // return "<Redirect to = '/login'/>"
      console.log(this.props)
      this.props.history.push('/login')
    }else if (userType == 'User'){
      state.user.type = 'User';
      this.setState({...state})
    }else{
      state.user.type = 'admin';
      this.setState({...state})
    }
  }
  openModalWindow = (response) => {
    response.isOpen = true;
    this.setState({modalWindowProps: response})
  }
  handleModalClosing = () => {
    const state = this.state;
    
    state.modalWindowProps = {
      isOpen: false,
      message: "",
      isSuccess: true,
      redirectLink: undefined
    };
    this.setState({...state});
  }
  render(){
    return (
      <Router>
        <HeaderComponent/>
        <div className="app-container">
          <ModalWindow isOpen={this.state.modalWindowProps.isOpen} isSuccess={this.state.modalWindowProps.isSuccess} message={this.state.modalWindowProps.message} redirectLink={this.state.modalWindowProps.redirectLink} closeModal={this.handleModalClosing}/>
          <Switch>
            <Route path="/login">
              <LoginComponent isError={false}/>
            </Route>
            <Route path="/sign-up">
              <SignUp triggerModal={this.openModalWindow}/>
            </Route>
            <Route path="/forgot-password">
              <ForgotPassword/>
            </Route>
            <Route path="/about-us">
              <AboutUsPage />
            </Route>
            <Route path="/admin">
              <AdminPage />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
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
import ResetPassword from './login/ResetPassword';
import HeaderComponent from './components/Header';
import AboutUsPage from './components/AboutUsPage';
import ModalWindow from './common/ModalWindow';
import FooterComponent from './components/Footer';

import Spinner from './common/Spinner';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

import axiosHandler from './common/axios';
import './common/common.css';

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
      },
      showSpinner: false,
      isLoggedIn: false,
      userDetails: {
        name: ''
      }
    }
  }

  componentDidMount(){
    const userType = localStorage.getItem('user-type')
    const state = this.state;
    
    if (userType == 'User'){
      state.user.type = 'User';
      state.isLoggedIn = true;
    }else if (userType == 'Admin'){
      state.user.type = 'admin';
      state.isLoggedIn = true;
    }else{
      state.isLoggedIn = false;
    }

    if(state.isLoggedIn){
      // const email = localStorage.getItem('email')
      // const self = this;
      // const url = '/user/fetch?email=' + email;
      
      // axiosHandler.get(url).then((res) => {
      //     localStorage.setItem('userName',res.data.firstName + ' ' +  res.data.lastName);
      // })
    }
    this.setState({...state})
  }

  componentDidUpdate(prevState,nextState) {
    const userType = localStorage.getItem('user-type');
    if (userType == "Admin" && nextState.user.type == undefined){
        const state = this.state;
        state['user'].type = userType;
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
      redirectLink: undefined,
    };
    this.setState({...state});
  }

  signOutUser = () => {
    localStorage.setItem('user-type', undefined);
    localStorage.setItem('email', undefined);
    localStorage.setItem('userName', undefined);

    let modalWindow = {
      isOpen: true,
      message: "You have been successfully logged out!",
      isSuccess: true,
      redirectLink: '/'
    }
    const state = this.state;
    state.isLoggedIn = false;
    state['modalWindowProps'] = modalWindow;

    this.setState({...state});
  }

  triggerSpinnerDisplay = (value) => {
    this.setState({showSpinner: value});
  }

  render(){
    return (
      <Router>
        <HeaderComponent isLoggedIn={this.state.isLoggedIn} signOutUser={this.signOutUser} userType={this.state.user.type}/>
        
        <div className="app-container">
          <ModalWindow isOpen={this.state.modalWindowProps.isOpen} isSuccess={this.state.modalWindowProps.isSuccess} message={this.state.modalWindowProps.message} redirectLink={this.state.modalWindowProps.redirectLink} closeModal={this.handleModalClosing}/>
          <Spinner show={this.state.showSpinner}/>
          <Switch>
            <Route path="/login">
              <LoginComponent isError={false} userLoggedIn={() => {this.setState({isLoggedIn: true})}}/>
            </Route>
            <Route path="/sign-up">
              <SignUp triggerModal={this.openModalWindow} isProfile={false}/>
            </Route>
            <Route path="/forgot-password">
              <ForgotPassword triggerModal={this.openModalWindow} />
            </Route>
            <Route path="/profile">
              <SignUp triggerModal={this.openModalWindow} isProfile={true} showcaseSpinner={this.triggerSpinnerDisplay}/>
            </Route>
            <Route path="/reset-password">
              <ResetPassword isLoggedIn={this.state.isLoggedIn} triggerModal={this.openModalWindow}/>
            </Route>
            <Route path="/about-us">
              <AboutUsPage />
            </Route>
            <Route path="/admin">
              <AdminPage />
            </Route>
            <Route path="/">
              <LandingPage isLoggedIn={this.state.isLoggedIn}/>
            </Route>
          </Switch>
        </div>
        <FooterComponent/>
      </Router>
    );
  }
}

export default App;

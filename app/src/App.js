import React from 'react';
import axios from 'axios';
import User from './JSmodels/user';

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
import ServicesPage from './services/ServicesPage';
import CreateService from './services/CreateService';

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
    this.state = User;
  }

  componentDidMount(){
    const userType = localStorage.getItem('user-type')
    const userName = localStorage.getItem('userName')
    const state = this.state;
    
    // console.log(localStorage,this.state)
    if (userType == 'User'){
      state.user.type = 'User';
      state.isLoggedIn = true;
      state.userDetails.name = userName;
    }else if (userType == 'Admin'){
      state.user.type = 'admin';
      state.isLoggedIn = true;
      state.userDetails.name = userName;
    }else{
      state.isLoggedIn = false;
    }

    if(state.isLoggedIn){
      
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
    
    // console.log('ASDASD',userType,localStorage.getItem('userName'),prevState,nextState.user.type, this.state.isLoggedIn);

    // if (this.state.isLoggedIn && userType != undefined && nextState.userDetails.name == ''){
    //   const state = this.state;
    //   state['user'].type = userType;
    //   state['userDetails'].name = localStorage.getItem('userName');
    //   console.log(localStorage.getItem('userName'))
    //   this.setState({...state});
    // }
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

  callParentLog = (data) => {
    const state = this.state;
    state['userDetails'].name = data.firstName + ' ' + data.lastName;
    this.setState({...state})
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
              <LoginComponent isError={false} calllParent={this.callParentLog} userLoggedIn={() => {this.setState({isLoggedIn: true})}} displayLoader={this.triggerSpinnerDisplay}/>
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
            <Route path="/services">
              <ServicesPage showcaseSpinner={this.triggerSpinnerDisplay} triggerModal={this.openModalWindow}/>
            </Route>
            <Route path="/create-service">
              <CreateService triggerModal={this.openModalWindow}/>
            </Route>
            <Route path="/admin">
              <AdminPage />
            </Route>
            <Route path="/">
              <LandingPage isLoggedIn={this.state.isLoggedIn} userName={this.state.userDetails.name}/>
            </Route>
          </Switch>
        </div>
        <FooterComponent/>
      </Router>
    );
  }
}

export default App;

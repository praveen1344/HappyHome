import React, { useState } from 'react';
import './login.css';
import LabelInput from '../common/LabelledInput';
import PrimaryButton from '../common/PrimaryButton';
import axiosHandler from './../common/axios';

import { withRouter } from'react-router-dom';

class LoginComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            formSubmitted: false,
            isError: props.isError,
            loginForm: {
                email: {
                    identifier: 'email',
                    label: 'Email',
                    type: 'text',
                    value: ''
                },
                password: {
                    identifier: 'password',
                    label: 'Password',
                    type: 'password',
                    value: ''
                }
            }
        }
    }

    loginActionBinder = (boolean) => {
        const stateCopy = this.state;
        stateCopy.formSubmitted = true;
        this.setState({...stateCopy})
        const form = this.state.loginForm;
        const body = {
            email: form.email.value,
            password: form.password.value
        }
        var self = this;
        let userLoggedIn = false;
        axiosHandler.post('/login/user',{...body})
            .then((res) => {
                localStorage.setItem('user-type', res.data);
                localStorage.setItem('email', form.email.value);
                self.props.userLoggedIn(true);
                self.props.displayLoader(true);
                userLoggedIn = true;
                self.userLoadData(form.email.value);
                // self.props.history.push("/");
            })
            .catch(function(error){
                console.log(error)
                const formElements = self.state;
                formElements.isError = true;
                formElements.formSubmitted = false;
                self.setState({formElements})
                let timeoutSelf = self;
                localStorage.setItem('user-type', undefined);
                localStorage.setItem('email', undefined);
                setTimeout(function(){
                    formElements.isError = false;
                    formElements.loginForm['email'].value = '';
                    formElements.loginForm['password'].value = '';
                    timeoutSelf.setState(formElements);
                },300);
            });
    }

    userLoadData = (email) => {
        const url = '/user/fetch?email=' + email;
        const self = this;
        axiosHandler.get(url).then((res) => {
            console.log(res.data);
            localStorage.setItem('userName', res.data.firstName + ' ' + res.data.lastName)
            self.handleSavingDetails(res.data);    
        })
    }

    handleSavingDetails = (response) => {
        const self = this;
        setTimeout(() => {
            self.props.displayLoader(false);
            self.props.calllParent(response);
            self.props.history.push("/");
        },300)
    }

    handleEntry = (e) => {
        const element = this.state.loginForm[e.target.name]
        element.value = e.target.value;

        this.setState({...this.state})
    }

    render(){
        let isErrorClassName = this.state.isError ? "shake-animation active":"shake-animation";
        
        return(
            <div className="login-page-container">
                <div className="login-container position-center">
                    <div className={isErrorClassName}>
                        <LabelInput identifier={this.state.loginForm.email.identifier} label={this.state.loginForm.email.label} type={this.state.loginForm.email.type} val={this.state.loginForm.email.value} handleEntry={this.handleEntry}/>
                        <LabelInput identifier={this.state.loginForm.password.identifier} label={this.state.loginForm.password.label} type={this.state.loginForm.password.type} val={this.state.loginForm.password.value} handleEntry={this.handleEntry}/>
                        
                        <PrimaryButton label="Submit" onClick={this.loginActionBinder} isDisabled={this.state.formSubmitted}/>
                        <div className="signup-links-container">
                            <a href="/forgot-password">Forgot Password?</a>
                            <a href="/sign-up">New User/Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginComponent);
import React, { useState } from 'react';
import './login.css';
import LabelInput from '../common/LabelledInput';
import PrimaryButton from '../common/PrimaryButton';
import axiosHandler from './../common/axios';

class LoginComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            formSubmitted: false,
            isError: props.isError,
            loginForm: {
                username: {
                    identifier: 'username',
                    label: 'User Name',
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
            email: form.username.value,
            password: form.password.value
        }
        var self = this;
        axiosHandler.post('/login/user',{...body})
            .then(res => {
                console.log(res);
                localStorage.setItem('user-type', res.data);
            })
            .catch(function(error){
                const formElements = self.state;
                formElements.isError = true;
                formElements.formSubmitted = false;
                self.setState({formElements})
                let timeoutSelf = self;
                localStorage.setItem('user-type', undefined);
                setTimeout(function(){
                    formElements.isError = false;
                    formElements.loginForm['username'].value = '';
                    formElements.loginForm['password'].value = '';
                    timeoutSelf.setState(formElements);
                },300);
            })
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
                        <LabelInput identifier={this.state.loginForm.username.identifier} label={this.state.loginForm.username.label} type={this.state.loginForm.username.type} val={this.state.loginForm.username.value} handleEntry={this.handleEntry}/>
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

export default LoginComponent;
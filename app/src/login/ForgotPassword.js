import React, { useState,useEffect } from 'react';
import './login.css';
import LabelInput from '../common/LabelledInput';
import PrimaryButton from '../common/PrimaryButton';
import SuccessMessage from '../common/SuccessMessage';
import axios from '../common/axios';

class ForgotPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: undefined,
            showEmailSentMessage: false,
            isError: false,
            errorMessage: ''
        }
    }
    handleEntry = (e) => {
        const elementValue = e.target.value;
        this.setState({email: elementValue});
    }
    handleFocusState = (name) => {
        const state = this.state
        state.isError = false;
        this.setState({...state})
    }
    
    submit = () =>{
        const state = this.state;
        
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regex.test(this.state.email))
        {
            state.isError = true;
            state.errorMessage = 'Please enter a valid email address!';
        }
        this.setState({...state});

        this.makePostCall(state.email);
    }

    makePostCall = (email) => {
        const response = {isSuccess: false, message: "", redirectLink: undefined};
        const self = this;
        axios.get(`/user/reset-password?email=${email}`)
            .then((data) => {
                response.isSuccess = true;
                response.message = 'A Reset Password link has been sent to you registered Email: ' + email;
                response.redirectLink = '/';
                self.props.triggerModal(response);
            })
            .catch((err) => {
                console.log(err,err.response)
                response.isSuccess = false;
                response.message = err.response.data.message;
                response.redirectLink = undefined;
                self.props.triggerModal(response);
            })
    }

    render(){
        return(
            <div className="login-page-container">
                <div className="forgot-password-container position-center">
                    <h2>Forgot Password?</h2>
                    <div style={{display: !this.state.showEmailSentMessage ? 'block' : 'none' }}>
                        <LabelInput identifier="username" label="Enter Registered Email ID" isError={this.state.isError} errorMessage={this.state.errorMessage} type="text" val={this.state.email} handleEntry={this.handleEntry} handleFocusState={this.handleFocusState}/>
                        <PrimaryButton label="Send" onClick={this.submit}/>
                    </div>
                    <div style={{display: this.state.showEmailSentMessage ? 'block' : 'none' }}>
                        <SuccessMessage text="An email with password reset instructions has been sent to your email address, if it exists on our system."/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;
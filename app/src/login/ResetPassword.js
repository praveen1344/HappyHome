import React from 'react';
import LabelInput from '../common/LabelledInput';
import PrimaryButton from '../common/PrimaryButton';
import axiosHandler from '../common/axios';

class ResetPassword extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentPassword: {
                isError: undefined,
                errorMessage: undefined,
                val: ''
            },
            newPassword: {
                isError: undefined,
                errorMessage: undefined,
                val: ''
            }
        }
    }

    handleEntry = (e) => {
        const element = this.state[e.target.name]
        element.val = e.target.value;
        this.setState({...this.state, [e.target.name]: element})
    }

    handleFocusState = (name) => {
        const element = this.state[name]
        element.isError = false;
        this.setState({...this.state, [name]: element})
    }

    validateForm = () => {
        const state = this.state;
        let isError = false;
        if (this.state.currentPassword.val == ''){
            state['currentPassword'].isError = true;
            state['currentPassword'].errorMessage = 'Field cannot be empty!';
            isError = !isError;
        }else if(this.state.newPassword.val.length == 0){
            state['newPassword'].isError = true;
            state['newPassword'].errorMessage = 'Field cannot be empty!';
            isError = !isError;
        }
        
        if (isError){
            this.setState({...state});
            return true;
        }

        return false
    }

    submitForm = (e) => {
        e.preventDefault();
        if(this.validateForm()) return;
        const response = {isSuccess: false, message: "", redirectLink: undefined};
        const email = localStorage.getItem('email');
        console.log(this.state);
        const self = this;
        axiosHandler.post(`/user/change-password`,{
            "currentPassword": self.state.currentPassword.val,
            "email": email,
            "newPassword": self.state.newPassword.val
        })
        .then((data) => {
            console.log(data);
            response.isSuccess = true;
            response.message = 'Your password has been reset!';
            response.redirectLink = '/';
            self.props.triggerModal(response);
        })
        .catch((err) => {
            console.log(err.response);
            response.isSuccess = false;
            response.message = err.response.data.message;
            response.redirectLink = undefined;
            self.props.triggerModal(response);
        })
    }

    render(){
        return(
            <div className='app-main-page-container grid'>
                <h1 className="page-title">Reset Password</h1>
                {/* <h1 className="page-title">Reset Password</h1> */}
                <form className="sign-up-form">
                    <LabelInput identifier="currentPassword" label="Enter Current Password" type="text" mandatory={true} isError={this.state.currentPassword.isError} errorMessage={this.state.currentPassword.errorMessage} val={this.state.currentPassword.val} handleEntry={this.handleEntry} handleFocusState={this.handleFocusState}/>
                    <LabelInput identifier="newPassword" label="Enter New Password" type="password" mandatory={true} isError={this.state.newPassword.isError} errorMessage={this.state.newPassword.errorMessage} val={this.state.newPassword.val} handleEntry={this.handleEntry} handleFocusState={this.handleFocusState}/>
                    <PrimaryButton label='Reset Password' onClick={this.submitForm}/>
                </form>
            </div>
        )
    }
}

export default ResetPassword;
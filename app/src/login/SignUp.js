import React, { useState } from 'react';
import LabelInput from '../common/LabelledInput';
import PrimaryButton from '../common/PrimaryButton';
import { SignUpForm, UpdateProfileForm } from './Signup-form';

import axiosHandler from './../common/axios';

// const SignUp = () => {

//     // const initialInputState = {firstName: {identifier: 'firstName', label:'First Name', type: 'text', mandatory: true, value: ''}};
//     const initialInputState = SignUpForm;
//     const [eachEntry, setEachEntry] = useState(initialInputState);
//     const { 
//             firstName,
//             lastName,
//             email,
//             password,
//             confirmpassword,
//             contact,
//             address1,
//             address2,
//             city,
//             state,
//             pincode
//         } = eachEntry
    
//     const handleEntry = (e) => {
//         const element = eachEntry[e.target.name]
//         element.value = e.target.value
//         setEachEntry({ ...eachEntry, [e.target.name]: element});
//     }

//     function validateform(){
//         console.log('sss')
//     }

//     const submitForm = (e) => {
//         validateform()
//         const formBody = {
//             firstName: firstName.value,
//             lastName: lastName.value,
//             email: email.value,
//             password: password.value
//         }
//         console.log(formBody)
//         // e.preventDefault();
//     }

//     return (
//         <div className='app-main-page-container grid'>
//             <h1 className="page-title">New Member Signup</h1>
//             <div className="signup-form-scrollwindow">
//                 <div className="sign-up-form">
//                     <LabelInput identifier={firstName.identifier} label={firstName.label} type={firstName.type} mandatory={firstName.mandatory} val={firstName.value} handleEntry={handleEntry}/>
//                     <LabelInput identifier={lastName.identifier} label={lastName.label} type={lastName.type} mandatory={lastName.mandatory} val={lastName.value} handleEntry={handleEntry}/>
//                     <LabelInput identifier={email.identifier} label={email.label} type={email.type} mandatory={email.mandatory} val={email.value} handleEntry={handleEntry}/>
//                     <LabelInput identifier={password.identifier} label={password.label} type={password.type} mandatory={password.mandatory} val={password.value} handleEntry={handleEntry}/>
//                     <LabelInput identifier={confirmpassword.identifier} label={confirmpassword.label} type={confirmpassword.type} mandatory={confirmpassword.mandatory} val={confirmpassword.value} handleEntry={handleEntry}/>
//                     <LabelInput identifier={contact.identifier} label={contact.label} type={contact.type} val={contact.value} handleEntry={handleEntry}/>
//                     <LabelInput identifier={address1.identifier} label={address1.label} type={address1.type} val={address1.value} handleEntry={handleEntry}/>
//                     <LabelInput identifier={address2.identifier} label={address2.label} type={address2.type} val={address2.value} handleEntry={handleEntry}/>
//                     <LabelInput identifier={city.identifier} label={city.label} type={city.type} val={city.value} handleEntry={handleEntry}/>
//                     <LabelInput identifier={state.identifier} label={state.label} type={state.type} val={state.value} handleEntry={handleEntry}/>
//                     <LabelInput identifier={pincode.identifier} label={pincode.label} type={pincode.type} val={pincode.value} handleEntry={handleEntry}/>
//                     <PrimaryButton label="Create Account" onClick={submitForm}/>
//                 </div>
//             </div>
//         </div>
//     );
// }


class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = props.isProfile ? UpdateProfileForm : SignUpForm;
        this.state.isProfile = props.isProfile;
    }
    
    handleEntry = (e) => {
        const element = this.state[e.target.name]
        element.value = e.target.value;
        this.setState({...this.state, [e.target.name]: element})
    }

    handleFocusState = (name) => {
        const element = this.state[name]
        element.isError = false;
        this.setState({...this.state, [name]: element})
    }

    componentDidMount(){
        if (this.state.isProfile){
            this.props.showcaseSpinner(true)
            const email = localStorage.getItem('email')
            const self = this;
            const url = '/user/fetch?email=' + email;
            const state = this.state;
            
            axiosHandler.get(url).then((res) => {
                const userData = res.data;
                
                for (let ele in userData){
                    if (ele in state && ele != 'password'){
                        state[ele].value = res.data[ele] == null ? '' : res.data[ele];
                    }
                }
                // console.log(state, userData)
                
            }).catch(function(error){
                console.log(error)
                alert('error')
                setTimeout(function(){
                    self.props.showcaseSpinner(false)
                },300)
            });
            setTimeout(function(){
                self.setState({...state})
                self.props.showcaseSpinner(false)
            },300)
        }
    }

    validateform(){
        const validationState = this.state;
        validationState.isFormValid = true;
        let validForm = true;
        for (const elem in validationState){
            const value = validationState[elem].value;
            const rules = validationState[elem].validations;
            
            for (const rule in rules){
                let isError = false;
                let errorMessage = '';
                switch(rule){
                    case 'mandatory':
                        if(value.length == 0){
                            isError = true;
                            errorMessage = 'Please enter a valid ' + validationState[elem].label + '!';
                        }
                        break;
                    case 'text':
                        if(value.length >= 30){
                            isError = true;
                            errorMessage = 'Field value cannot exceed 30 characters!';
                        }
                        break;
                    case 'isEmail':
                        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        if (!regex.test(value))
                        {
                            isError = true;
                            errorMessage = 'Please enter a valid email address!';
                        }
                        break;
                    case 'phone':
                        if (value.length != 10)
                        {
                            isError = true;
                            errorMessage = 'Please enter a valid phone number!';
                        }
                        break;
                    case 'pincode':
                        if (value.length != 5)
                        {
                            isError = true;
                            errorMessage = 'Please enter a valid pincode!';
                        }
                        break;
                }
                if (isError){
                    validationState.isFormValid = false
                    validationState[elem].isError = isError;
                    validationState[elem].errorMessage = errorMessage;
                }
            }
        }
        if(!this.state.isProfile){
            const passwordField = validationState['password'].value;
            const confirmPasswordField = validationState['confirmpassword'].value;

            if (validationState.isFormValid && passwordField != confirmPasswordField){
                validationState.isFormValid = false;
                validationState.confirmpassword.isError = true;
                validationState.confirmpassword.errorMessage = "Passwords dont match!";
            }
        }
        this.setState({...validationState})
    }

    createUser = (formBody) => {
        let self = this;
        let response = {isSuccess: false, message: ""};
        axiosHandler.post('/user/add',{...formBody})
            .then(res => {
                console.log(res)
                response.isSuccess = true;
                response.message = 'User Created!';
                response.redirectLink = '/';
                self.props.triggerModal(response)
            })
            .catch(function (error) {
                console.log(error,error.response)
                response.isSuccess = false;
                response.message = error.response.data.message;
                response.redirectLink = undefined;
                self.props.triggerModal(response)

                const stateCopy = self.state;
                stateCopy.isFormSubmitted = false;
                self.setState({...stateCopy})
            })
    }

    updateUser = (formBody) => {
        let self = this;
        let response = {isSuccess: false, message: ""};
        axiosHandler.post('/user/update',{...formBody})
            .then(res => {
                response.isSuccess = true;
                response.message = 'User Profile Updated!';
                response.redirectLink = '/';
                self.props.triggerModal(response)
            })
            .catch(function (error) {
                console.log(error)
                response.isSuccess = false;
                response.message = 'There was an error with updating the profile!';
                response.redirectLink = undefined;
                self.props.triggerModal(response)
            })
    }

    submitForm = (e) => {
        if(!this.state.isProfile){
            this.validateform();
            const formBody = {
                firstName: this.state.firstName.value,
                lastName: this.state.lastName.value,
                email: this.state.email.value,
                password: this.state.password.value
            }
            
            if (this.state.isFormValid){
                const stateCopy = this.state;
                stateCopy.isFormSubmitted = true;
                this.setState({...stateCopy})
                this.createUser(formBody)
            }
            e.preventDefault();
        }else{
            e.preventDefault();
            this.validateform();
            const formBody = {
                firstName: this.state.firstName.value,
                lastName: this.state.lastName.value,
                email: this.state.email.value,
                bio: this.state.bio.value,
                address: this.state.address.value,
                contact: this.state.contact.value
            }
            
            if (this.state.isFormValid){
                const stateCopy = this.state;
                stateCopy.isFormSubmitted = true;
                this.setState({...stateCopy})
                this.updateUser(formBody)
            }
            // this.createUser(formBody)
        }
    }
    renderProfilePage = () => {
        let ButtonText = this.state.isProfile ? 'Update Profile' : 'Create Profile';
        return (
            <form className="sign-up-form">
                <LabelInput identifier={this.state.firstName.identifier} label={this.state.firstName.label} type={this.state.firstName.type} mandatory={this.state.firstName.mandatory} isError={this.state.firstName.isError} errorMessage={this.state.firstName.errorMessage} val={this.state.firstName.value} handleEntry={this.handleEntry} handleFocusState={this.handleFocusState}/>
                <LabelInput identifier={this.state.lastName.identifier} label={this.state.lastName.label} type={this.state.lastName.type} mandatory={this.state.lastName.mandatory} isError={this.state.lastName.isError} errorMessage={this.state.lastName.errorMessage} val={this.state.lastName.value} handleEntry={this.handleEntry} handleFocusState={this.handleFocusState}/>
                
                {/*<LabelInput identifier={this.state.email.identifier} label={this.state.email.label} type={this.state.email.type} mandatory={this.state.email.mandatory} isError={this.state.email.isError} errorMessage={this.state.email.errorMessage} val={this.state.email.value} handleEntry={this.handleEntry} handleFocusState={this.handleFocusState}/>
                <LabelInput identifier={this.state.password.identifier} label={this.state.password.label} type={this.state.password.type} mandatory={this.state.password.mandatory} isError={this.state.password.isError} errorMessage={this.state.password.errorMessage} val={this.state.password.value} handleEntry={this.handleEntry} handleFocusState={this.handleFocusState}/>
                <LabelInput identifier={this.state.confirmpassword.identifier} label={this.state.confirmpassword.label} type={this.state.confirmpassword.type} mandatory={this.state.confirmpassword.mandatory} isError={this.state.confirmpassword.isError} errorMessage={this.state.confirmpassword.errorMessage} val={this.state.confirmpassword.value} handleEntry={this.handleEntry} handleFocusState={this.handleFocusState}/> */}
                <LabelInput identifier={this.state.bio.identifier} label={this.state.bio.label} type={this.state.bio.type} val={this.state.bio.value} handleEntry={this.handleEntry}/>
                {/* <LabelInput identifier={this.state.dob.identifier} label={this.state.dob.label} type={this.state.dob.type} val={this.state.dob.value} handleEntry={this.handleEntry}/> */}
                <LabelInput identifier={this.state.contact.identifier} label={this.state.contact.label} type={this.state.contact.type} val={this.state.contact.value} handleEntry={this.handleEntry}/>
                <LabelInput identifier={this.state.address.identifier} label={this.state.address.label} type={this.state.address.type} val={this.state.address.value} handleEntry={this.handleEntry}/>
                {/* <LabelInput identifier={this.state.city.identifier} label={this.state.city.label} type={this.state.city.type} val={this.state.city.value} handleEntry={this.handleEntry}/>
                <LabelInput identifier={this.state.state.identifier} label={this.state.state.label} type={this.state.state.type} val={this.state.state.value} handleEntry={this.handleEntry}/>
                <LabelInput identifier={this.state.pincode.identifier} label={this.state.pincode.label} type={this.state.pincode.type} val={this.state.pincode.value} handleEntry={this.handleEntry}/> */}
                <PrimaryButton label={ButtonText} onClick={this.submitForm} isDisabled={this.state.isFormSubmitted}/>
                <a className="reset-password-anchor" href='/reset-password'>Reset Password</a>
            </form>
        )
    }
    renderSignUpPage = () =>{
        let ButtonText = this.state.isProfile ? 'Update Profile' : 'Create Profile';
        return(
            <form className="sign-up-form">
                <LabelInput identifier={this.state.firstName.identifier} label={this.state.firstName.label} type={this.state.firstName.type} mandatory={this.state.firstName.mandatory} isError={this.state.firstName.isError} errorMessage={this.state.firstName.errorMessage} val={this.state.firstName.value} handleEntry={this.handleEntry} handleFocusState={this.handleFocusState}/>
                <LabelInput identifier={this.state.lastName.identifier} label={this.state.lastName.label} type={this.state.lastName.type} mandatory={this.state.lastName.mandatory} isError={this.state.lastName.isError} errorMessage={this.state.lastName.errorMessage} val={this.state.lastName.value} handleEntry={this.handleEntry} handleFocusState={this.handleFocusState}/>
                <LabelInput identifier={this.state.email.identifier} label={this.state.email.label} type={this.state.email.type} mandatory={this.state.email.mandatory} isError={this.state.email.isError} errorMessage={this.state.email.errorMessage} val={this.state.email.value} handleEntry={this.handleEntry} handleFocusState={this.handleFocusState}/>
                <LabelInput identifier={this.state.password.identifier} label={this.state.password.label} type={this.state.password.type} mandatory={this.state.password.mandatory} isError={this.state.password.isError} errorMessage={this.state.password.errorMessage} val={this.state.password.value} handleEntry={this.handleEntry} handleFocusState={this.handleFocusState}/>
                <LabelInput identifier={this.state.confirmpassword.identifier} label={this.state.confirmpassword.label} type={this.state.confirmpassword.type} mandatory={this.state.confirmpassword.mandatory} isError={this.state.confirmpassword.isError} errorMessage={this.state.confirmpassword.errorMessage} val={this.state.confirmpassword.value} handleEntry={this.handleEntry} handleFocusState={this.handleFocusState}/>
                <PrimaryButton label={ButtonText} onClick={this.submitForm} isDisabled={this.state.isFormSubmitted}/>
            </form>
        )
    }

    renderForm = () => {
        if (this.state.isProfile){
            return this.renderProfilePage()
        }else{
            return this.renderSignUpPage()
        }
    }

    render(){
        if(this.props.isProfile){
            
        }
        let headerText = this.state.isProfile ? 'Update Profile' : 'New Member Signup';
        return (
            <div className='app-main-page-container grid'>
                <h1 className="page-title"> {headerText} </h1>
                <div className="signup-form-scrollwindow">
                    {
                        this.renderForm()
                    }
                </div>
            </div>
        );
    }
    
}

export default SignUp;
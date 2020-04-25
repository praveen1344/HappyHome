import React from 'react';
import LabelInput from './common/LabelledInput';
import DatePickerComponent from './../common/DatePicker';
import DropDown from './../common/DropDown';
import PrimaryButton from './../common/PrimaryButton';
import {serviceObject,servicePostRequestObject} from './ServiceForm';
import axiosHandler from './../common/axios';

// import DatePicker from 'react-'

class CreateService extends React.Component{
    constructor(props){
        super(props);
        this.state =  serviceObject;
    }

    handleEntry = (name,value) => {
        const element = this.state[name]
        element.value = value;
        this.setState({...this.state, [name]: element})
    }

    componentDidMount(){
        const state = this.state;

        state['email'].value = localStorage.getItem('email');
        this.setState({...state});
    }

    submit = (e) => {
        e.preventDefault()
        const form = servicePostRequestObject;
        const state = this.state;
        // this.setState({'isFormSubmitted': true})
        state.isFormSubmitted = true;
        this.setState({...state});
        
        const checkForm = {
            "serviceName": state.name.value,
            "serviceCategory": state.category.value.serviceCategoryName,
            "serviceCategoryOther": state.category.value.serviceCategoryName == 'Other' ? state.otherCategory.value : '', 
            "serviceDescription": state.description.value ? state.description.value : "",
            "serviceLocation": state.location.value ? state.location.value : "",
            "servicePrice": state.price.value != undefined ? state.price.value.serviceCategoryName : state.time.options[0].serviceCategoryName,
            "serviceDate": state.date.value ? state.date.value : new Date(),
            "serviceTime": state.time.value != undefined ? state.time.value.serviceCategoryName : state.time.options[0].serviceCategoryName,
            "serviceStatus": "NEW",
            "userEmail": localStorage.getItem('email')
        }
        
        // form["serviceCategory"] = state.category.value.serviceCategoryName;
        // form["serviceCategoryOther"] = state.category.value.serviceCategoryName == 'Other' ? state.otherCategory.value : '';
        // // form["serviceCategoryOther"] = 'dddd';
        // form["serviceDate"] = state.date.value ? state.date.value : new Date();
        // form["serviceDate"] = "2020-04-25";
        
        // form["serviceDescription"] = state.description.value ? state.description.value : "";
        // form["serviceLocation"] = state.location.value ? state.location.value : "";
        // form["serviceName"] = state.name.value ? state.name.value : "";
        // form["serviceStatus"] = "false";
        // form["servicePrice"] = state.price.value != undefined ? state.price.value.serviceCategoryName : state.time.options[0].serviceCategoryName;
        // // form["servicePrice"] = "sss";
        // form["serviceTime"] = state.time.value != undefined ? state.time.value.serviceCategoryName : state.time.options[0].serviceCategoryName;
        // form["userEmail"] =  localStorage.getItem('email')

        console.log(form);
        const self = this;
        let response = {isSuccess: false, message: ""};
        axiosHandler.post('/service/create', checkForm)
            .then((res) => {
                console.log(res.data);
                response.isSuccess = true;
                response.message = 'Service Created!';
                response.redirectLink = '/services';
                self.props.triggerModal(response)
            })
            .catch((error) => {
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

    handleDropDownSelection = (name,index) => {
        const state = this.state;
        const element = state[name];
        element.value = element.options[index];
        
        if (name == 'category'){
            if(index == (element.options.length - 1)){
                state['otherCategory'].toBeDisplayed = true
            }else{
                state['otherCategory'].toBeDisplayed = false
            }
        }

        this.setState({...state})
    }

    render(){
        return(
            <div className='app-main-page-container grid'>
                <h1 className="page-title"> Create Service </h1>
                <div className="signup-form-scrollwindow">
                    <form className="create-service-form">
                    <LabelInput isDisabled={this.state.email.isDisabled ? true : false} identifier={this.state.email.identifier} label={this.state.email.label} type={this.state.email.type} mandatory={this.state.email.mandatory} val={this.state.email.value} handleEntry={this.handleEntry}/>
                        <LabelInput identifier={this.state.name.identifier} label={this.state.name.label} type={this.state.name.type} mandatory={this.state.name.mandatory} val={this.state.name.value} handleEntry={this.handleEntry}/>
                        <LabelInput identifier={this.state.description.identifier} label={this.state.description.label} type={this.state.description.type} mandatory={this.state.description.mandatory} val={this.state.description.value} handleEntry={this.handleEntry}/>
                        <LabelInput identifier={this.state.location.identifier} label={this.state.location.label} type={this.state.location.type} mandatory={this.state.location.mandatory} val={this.state.location.value} handleEntry={this.handleEntry}/>
                        <DatePickerComponent identifier={this.state.date.identifier} label={this.state.date.label} value={this.state.date.value} handleEntry={this.handleEntry}/>
                        <DropDown identifier={this.state.category.identifier} label={this.state.category.label} options={this.state.category.dropDownValues} handleDropDownSelection={this.handleDropDownSelection}/>
                        {/* <LabelInput identifier={this.state.location.identifier} label={this.state.location.label} type={this.state.location.type} mandatory={this.state.location.mandatory} val={this.state.location.value} handleEntry={this.handleEntry}/> */}
                        {
                            this.state.otherCategory.toBeDisplayed ? 
                                    <LabelInput identifier={this.state.otherCategory.identifier} label={this.state.otherCategory.label} type={this.state.otherCategory.type} mandatory={this.state.otherCategory.mandatory} val={this.state.otherCategory.value} handleEntry={this.handleEntry}/> : null
                        }
                        <DropDown identifier={this.state.price.identifier} label={this.state.price.label} options={this.state.price.dropDownValues} mandatory={this.state.price.mandatory} val={this.state.price.value} handleDropDownSelection={this.handleDropDownSelection}/>
                        <DropDown identifier={this.state.time.identifier} label={this.state.time.label} options={this.state.time.dropDownValues} mandatory={false} val={this.state.time.value} handleDropDownSelection={this.handleDropDownSelection}/>
                        
                        <PrimaryButton label='Submit' onClick={this.submit} isDisabled={false}/>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateService;
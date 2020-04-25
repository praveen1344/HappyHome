import React, { useEffect, useState } from 'react';
import axiosHandler from './../common/axios';

let mapping = {
    'House Cleaning': "./assets/icon-car.png",
    'Carpentry': "./assets/icon-wrench.png",
    'Plumbing': "./assets/icon-lawn.png",
    'Other': "./assets/tools-icon.jpg",
    'Beauty Services': "./assets/tools-icon.jpg",
    'Pet Services': "./assets/tools-icon.jpg",
}

class ServiceTile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isCardFlipped: false,
            isServiceRequested: false
        }
    }
    
    handleCardFlip = (event,flag) => {
        event.preventDefault();
        this.setState({isCardFlipped: flag})
    }

    serviceRequest = () => {
        if (this.state.isServiceRequested == true || localStorage.getItem('email') == this.props.userData.email){
            return
        }
        console.log('Service Request',this.props.userData.email, localStorage.getItem('email'))
        this.setState({isServiceRequested: true})
        const self = this;
        let response = {isSuccess: false, message: ""};
        axiosHandler.post('/service/request',{
            "requesterEmail": localStorage.getItem('email'),
            "serviceCreatorEmail": this.props.userData.email,
            "serviceId": this.props.serviceData.id
        }).then((response) => {
            console.log(response.data);
            response.isSuccess = true;
            response.message = 'Service Request Generated! Please check your email!';
            response.redirectLink = '/services';
            self.props.triggerModal(response)
        }).catch((error) => {
            console.log(error,error.response)
            response.isSuccess = false;
            response.message = error.response.data.message;
            response.redirectLink = undefined;
            self.props.triggerModal(response)
        })
    }

    renderStatus = () => {
        if(this.props.serviceData.serviceStatus.statusName == 'NEW'){
            return <div className='service-tile-status new'>NEW</div>
        }else if (this.props.serviceData.serviceStatus.statusName == 'IN PROGRESS'){
            return <div className='service-tile-status in-progress'>IN PROGRESS</div>
        }else{
            return <div className='service-tile-status completed'>CLOSED</div>
        }
    }
    
    render(){
        let tileClass = this.state.isCardFlipped ? 'service-tile flipped' : 'service-tile';
        return(
            <li className={tileClass} id={this.props.id}>
                <div className='service-tile-content-container'>
                    <div className="service-tile-outter-container flipcard-front">
                        {
                            this.renderStatus()
                            
                        }
                        <div className='service-img-container'>
                            <img src={mapping[this.props.serviceData.serviceCategoryID.serviceCategoryName]}/>
                        </div>
                        <div className='service-desc-container'>
                            <div className="service-details">
                                <h1>{this.props.serviceData.serviceName}</h1>
                                <div>Avg Cost: {this.props.serviceData.servicePrice}</div>
                                <div>Availability: {this.props.serviceData.serviceDate}</div>
                                <div>Convenient Servicing Time: {this.props.serviceData.serviceTime}</div>
                            </div>
                            
                            <a href="" className='further-info' onClick={(e) => this.handleCardFlip(e,true)}>Want to Know More Information?</a>
                            {/* <button disabled={this.state.isServiceRequested} className="action-btn" onClick={this.serviceRequest}>Service Request</button> */}
                            {
                                !this.props.isDisabled ? 
                                    <button disabled={this.state.isServiceRequested} className="action-btn" onClick={this.serviceRequest}>Service Request</button>
                                : null
                            }
                        </div>
                    </div>
                    
                    <div className="flipcard-back service-tile-outter-container">
                        <div className="service-details">
                            <span className="close-tile" onClick={(e) => this.handleCardFlip(e,false)}>&times;</span>
                            <h1>Requestor Details:</h1>
                            <div>Requestor Name: {this.props.userData.firstName} {this.props.userData.lastName}</div>
                            <div>Contact Details: {this.props.userData.contact}</div>
                            <h1>Services Details:</h1>
                            <div>Type: {this.props.serviceData.serviceCategoryID.serviceCategoryName}</div>
                            <div>Description: {this.props.serviceData.servieDescription}</div>
                            <div>Availability: {this.props.serviceData.serviceDate}</div>
                            <div>Convenient Servicing Time: {this.props.serviceData.serviceTime}</div>
                            <div>Avg Cost: {this.props.serviceData.servicePrice} - Negotiable</div>
                        </div>
                        {
                            !this.props.isDisabled ? 
                                <button disabled={this.state.isServiceRequested} className="action-btn" onClick={this.serviceRequest}>Service Request</button>
                             : null
                        }
                        
                    </div>
                </div>
            </li>
        )
    }
}

export default ServiceTile;
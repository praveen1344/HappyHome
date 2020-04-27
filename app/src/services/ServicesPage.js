import React from 'react';
import ServiceTile from './ServiceTile';
import axiosHandler from './../common/axios';
import './services.css';
import ServiceFilterPanel from './ServiceFilterPanel';

const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

class ServicesPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allServices: undefined,
            myRequestedServices: undefined,
            options: [
                {
                    id: 0,
                    title: 'All Service Requests'
                }
                ,
                {
                    id: 1,
                    title: 'My Service Requests'
                },
                {
                    id: 2,
                    // title: 'Interested Service Requests'
                    title: 'Interested Services'
                }
            ],
            selectedIndex: 0,
            isServicesLoaded: false
        }
    }

    componentDidMount(){
        this.props.showcaseSpinner(true);
        const state = this.state;
        const self = this;
        let response = undefined;
        axiosHandler.get('/service/all')
            .then((res) => {
                console.log(res)
                self.parseData(res);
                // response = res.data;

                // state.response = response.map((ele) => {
                //     let current_datetime = new Date(ele.service.serviceDate);
                //     ele.service.serviceDate = current_datetime.getDate() + "-" + months[(current_datetime.getMonth())] + "-" + current_datetime.getFullYear()
                //     return ele
                // });
                
                // self.props.showcaseSpinner(false);
                // state.isServicesLoaded = true;
                // self.setState({...state});
            });
    }

    parseData = (response) => {
        let dateParsedResponse = response.data.map((ele) => {
            let current_datetime = new Date(ele.service.serviceDate);
            ele.service.serviceDate = current_datetime.getDate() + "-" + months[(current_datetime.getMonth())] + "-" + current_datetime.getFullYear()
            return ele
        });
        const email = localStorage.getItem('email')
        
        let allServices = dateParsedResponse.filter((ele) => {
            return ele.user.email != email && ele.service.serviceStatus.id == 1
        })
        let myRequestedServices = dateParsedResponse.filter((ele) => ele.user.email == email && ele.creator == true)
        let requestsToBeServiced = dateParsedResponse.filter((ele) => {
            return ele.interested == true && ele.user.email == email
        })
        
        const state = this.state;
        state.allServices = allServices;
        state.myRequestedServices = myRequestedServices
        state.requestsToBeServiced = requestsToBeServiced
        this.props.showcaseSpinner(false);
        state.isServicesLoaded = true;
        if (this.state.selectedIndex == 0){
            state.response = state.allServices
        }else{
            state.response = state.myRequestedServices
        }
        this.setState({...state});
    }
    
    renderServiceTile = () => {
        
    }

    changeSelection = (index) =>{
        const state = this.state;
        state.selectedIndex = index;
        state.response = index == 0 ? state.allServices : (index == 1 ? state.myRequestedServices : state.requestsToBeServiced);
        // state.response = index == 0 ? state.allServices : state.myRequestedServices;
        this.setState({...state});
    }
    render(){
        const self = this;

        // id: 0,
        //             title: 'All Service Requests'
        //         }
        //         ,
        //         {
        //             id: 1,
        //             title: 'My Service Requests'
        //         },
        //         {
        //             id: 2,
        //             // title: 'Interested Service Requests'
        //             title: 'Interested Services'
        // let pageHeader = this.state.selectedIndex == 0 ? 'All Service Requests' : (this.state.selectedIndex == 1 ? 'My Service Requests' : 'Interested Services')
        return (
            <div className="service-page-container">
                <div className="filters-container">
                    <ServiceFilterPanel options={this.state.options} selectedIndex={this.state.selectedIndex} changeSelection={this.changeSelection}/>
                </div>
                <div className="services-container">
                    <ul className='services-list-container'>
                        {
                            (this.state.isServicesLoaded == true && this.state.response.length > 0) ?
                                this.state.response.map((ele,index) => {
                                    return(
                                        <ServiceTile isDisabled={this.state.selectedIndex == 1 || this.state.selectedIndex == 2} serviceData={ele.service} userData={ele.user} index={index} id={index} triggerModal={self.props.triggerModal}/>
                                    )
                                }) :
                                <div className="no-data">Sorry, you do not have any services in this section</div>
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default ServicesPage;
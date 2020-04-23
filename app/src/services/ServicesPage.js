import React from 'react';
import ServiceTile from './ServiceTile';

import './services.css';

class ServicesPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div className="service-page-container">
                <div className="filters-container">

                </div>
                <div className="services-container">
                    <ul className='services-list-container'>
                        <ServiceTile/>
                        <ServiceTile/>
                        <ServiceTile/>
                        <ServiceTile/>
                        <ServiceTile/>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ServicesPage;
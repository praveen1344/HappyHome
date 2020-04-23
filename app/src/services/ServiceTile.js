import React from 'react';

class ServiceTile extends React.Component{
    constructor(props){
        super(props);
    }
    render(props){
        return(
            <li class='service-tile'>
                <div class='service-tile-content-container'>
                    <div class='service-img-container'>
                        <img src="./assets/icon-car.png"/>
                    </div>
                    <div class='service-desc-container'>
                        <h1>HEB Ride Service</h1>
                        <div class="service-details">
                            <div>Avg Cost: $10 - $20</div>
                            <div>Availability: Mon - Thu</div>
                        </div>
                        <button class="action-btn">Service Request</button>
                    </div>
                </div>
            </li>
        )
    }
}

export default ServiceTile;
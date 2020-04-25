import React from 'react';
import ServiceTab from './serviceTab';

class ServiceFilterPanel extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
            <div className='service-filter-panel'>
                <a href='create-service' className='filter-create-service'>Create Service</a>
                <h1 className='filter-header'>Filters:</h1>
                <ul>
                    {
                        this.props.options.map((ele) => {
                            return(
                                <ServiceTab title={ele.title} index={ele.id} selectedIndex={this.props.selectedIndex} clicked={this.props.changeSelection}/>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default ServiceFilterPanel;
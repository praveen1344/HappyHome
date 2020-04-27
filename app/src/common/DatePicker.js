import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class DatePickerComponent extends React.Component{
    constructor(props){
        super(props);
        let today = new Date();
        let yesterday = new Date(today)
        this.state = {
            date: today,
            prevDate: yesterday
        }
    }
    
    onChange = date => {
        this.setState({ date });
        this.props.handleEntry( this.props.identifier,date )
    }
    
    render(){
        return (
            <div className="input-label-container">
                <label htmlFor={this.props.identifier}><span>{this.props.label}</span></label>
                <DatePicker 
                    onChange={this.onChange}
                    selected={this.state.date}
                    minDate={this.state.prevDate}
                />   
            </div>
        )
    }
}

export default DatePickerComponent;
import React from 'react';

class DropDown extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            options: props.options
        }
        // console.log(props.options)
    }

    optionChanged = (e) => {
        this.props.handleDropDownSelection(this.props.identifier,e.target.selectedIndex)
    }

    renderOptions = () => {
        return (
            this.state.options.map((element,index) => {
                return (
                    <option index={index}>
                        {element}
                    </option>
                )
            })
        )
        console.log(this.state.options)
    }

    render(){
        return (
            <div className="input-label-container">
                <label htmlFor={this.props.identifier}><span>{this.props.label}</span></label>
                <select onChange={this.optionChanged} name={this.props.identifier}>
                    {
                        this.renderOptions()
                    }
                </select>
            </div>
        )
    }
}

export default DropDown;
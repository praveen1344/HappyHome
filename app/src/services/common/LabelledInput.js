import React, {Component} from 'react';
import './common.css';

const LabelInput = (props) => {
    let isMandatory = props.mandatory ? 'mandatory' : '';
    let errorState = props.isError ? 'input-label-container error' : 'input-label-container';
    let isError = props.isError;
    
    const renderErrorMessage = () => {
        if(!isError){
            return null
        }else{
            return(
                <div className='error-message'>{props.errorMessage}</div>
            )
        }
    }

    const handleErrorState = (e) => {
        if (isError == true){
            props.handleFocusState(e.target.name)
        }
    }

    return(
        <div className={errorState}>
            <label className={isMandatory} htmlFor={props.identifier}><span>{props.label}</span></label>
            <input name={props.identifier} disabled={props.isDisabled} autoComplete='off' type={props.type} value={props.val} onChange={(e) => props.handleEntry(e.target.name,e.target.value)} onFocus={handleErrorState}/>
            <div className="bar"></div>
            {    
                renderErrorMessage()
            }    
        </div>
    )
}

export default LabelInput;
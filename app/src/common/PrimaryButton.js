import React from 'react';

const PrimaryButton = (props) => {
    let isDisabled = props.isDisabled ? "primary-button disabled":"primary-button";
    return(
        <button className={isDisabled} onClick={props.onClick}>
            {props.label}
        </button>
    )
}

export default PrimaryButton;
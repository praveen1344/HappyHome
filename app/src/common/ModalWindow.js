import React from 'react';

const ModalWindow = (props) => {
    let isOpen = props.isOpen;
    let modalDisplay = props.isOpen ? "modalWindow" : "modalWindow hidden";
    let imageSrc = props.isSuccess ? "./../assets/success.png" : "./../assets/error.png";
    let outcomeMssg = props.isSuccess ? "Success" : "Failure";
    let outcomeClass = props.isSuccess ? "modal-header-window success" : "modal-header-window failure";
    let isRedirect = props.redirectLink != undefined ? true : false;

    return(
        <div className={modalDisplay}>
            <div className="modal-bg"></div>
            <div className="modal-container">
                <div className="modal-content-container modal-container-animation">
                    
                    {
                        isRedirect ? (
                            <a href={props.redirectLink} className='closeModal-icon' >&#10005;</a>
                        ) : (
                            <a className='closeModal-icon' onClick={props.closeModal}>&#10005;</a>    
                        )
                    }
                    
                    <img className="modal-window-img" src={imageSrc}/>
                    <h1 className={outcomeClass}> {outcomeMssg} </h1>
                    <div>
                        {props.message}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow;
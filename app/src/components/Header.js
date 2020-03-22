import React from 'react';
import HamburgerMenu from './hamburgermenu';
import './header.css';
import '../common/common.css';

const HeaderComponent = (props) => {
    return(
        <div className="header-component">
            <div className="grid flex-container">
                <HamburgerMenu />
                <a className='hdr-logo'>
                    <img className="" src="../assets/hdr-logo.png"/>
                </a>
            </div>
        </div>
    )
}

export default HeaderComponent;
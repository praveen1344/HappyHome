import React from 'react';
import HamburgerMenu from './hamburgermenu';
import './header.css';
import '../common/common.css';

const HeaderComponent = (props) => {
    return(
        <div className="header-component">
            <div className="grid flex-container header-components">
                <div className="header-mobile-nav">
                    <HamburgerMenu />
                    <a className='hdr-logo' href="/">
                        <img className="" src="../assets/hdr-logo.png"/>
                    </a>
                    <a href="/login" className="user-avatar-li">
                        <img className="user-avatar" src="./assets/icons-login.png"/>
                    </a>
                </div>
                <div className="navigation-menu-container">
                    <ul className="navigation-menu">
                        <li><a href="/testimonials">Testimonials</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/about-us">About Us</a></li>
                        <li>
                            <a href="/login">
                                <img className="user-avatar" src="./assets/icons-login.png"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent;
import React from 'react';
import HomePageComponent from './components/HomePage';
const LandingPage = (props) => {
    return(
        <div className="landing-page-container">
            <HomePageComponent userName={props.userName} isLoggedIn={props.isLoggedIn}/>
        </div>
    )
}

export default LandingPage;
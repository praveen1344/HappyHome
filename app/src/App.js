import React from 'react';
import HappyLoft from './components/HappyLoftApp'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (

    <>
        <HappyLoft />
    </>


    // <Router>
    //   <HeaderComponent/>
    //   <div className="app-container">
    //     <Switch>
    //       <Route path="/login">
    //         <LoginComponent isError={false}/>
    //       </Route>
    //       <Route path="/sign-up">
    //         <SignUp/>
    //       </Route>
    //       <Route path="/forgot-password">
    //         <ForgotPassword/>
    //       </Route>
    //       <Route path="/about-us">
    //         <AboutUsPage />
    //       </Route>
    //       <Route path="/">
    //         <LandingPage />
    //       </Route>
    //     </Switch>
    //   </div>
    // </Router>
  );
}

export default App;
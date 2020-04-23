import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col } from 'react-bootstrap';
import './homepage.css';
import QuickSignUp from './QuickSignUp';
import axiosHandler from './../common/axios';

class HomePageComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            userDetails: {
                isLoggedIn: false,
                name: ""
            }
        }
    }
    componentDidMount(){
        const isLoggedIn = (localStorage.getItem('userName') != undefined)
        if (isLoggedIn){
            this.state.userDetails.name = localStorage.getItem('userName')
            this.state.userDetails.isLoggedIn = true
        }
    }
    render() {
        return ( 
            <>
            {
                this.props.isLoggedIn ? (
                    <h1 className='homepage-header'>Welcome, {this.props.userName}</h1>
                ) : (null)
            }
            <div className="carousel-container">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="carousel-img"
                        src="../assets/hh4.jpg"
                        alt="First slide"
                    />
                    <div className="shade"></div>
                    <Carousel.Caption>
                        <h3 className="carousel-caption-text">Services at your doorstep in no time</h3>
                        
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="carousel-img"
                        src="../assets/hh1.jpg"
                        alt="Second slide"
                    />
                    <div className="shade"></div>
                    <Carousel.Caption>
                        <h3 className="carousel-caption-text">Building a community together</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="carousel-img"
                        src="../assets/house.jpg"
                        alt="Third slide"
                    />
                    <div className="shade"></div>
                    <Carousel.Caption>
                        <h3 className="carousel-caption-text">Happy Loft, Happy We.</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </div>
            {/* <div className="landing-page-content-container"></div> */}
            <div className=" landing-page-content-containerhl-desc-container">
                <div className="desc-sub-container">
                    <h2 className="hl-heading">Why Happy Loft?</h2>
                    <Container>
                        <Row>
                            <Col md={6} className="container-2-col1">
                                <div className="hl-pts">
                                    <Row>
                                        <img
                                            className="hl-icon"
                                            src="../assets/home-icon.png"
                                            alt="home-icon"
                                        />
                                        <h5 className="icon-text">Easy, reliable way to take care of your home</h5>
                                    </Row>
                                    <Row>
                                        <img
                                            className="hl-icon"
                                            src="../assets/ppl-icon.png"
                                            alt="ppl-icon"
                                        />
                                        <h5 className="icon-text">Trusted, verified customers</h5>
                                    </Row>
                                    <Row>
                                        <img
                                            className="hl-icon"
                                            src="../assets/service-icon.png"
                                            alt="service-icon"
                                        />
                                        <h5 className="icon-text">Request for any service</h5>
                                    </Row>
                                </div>
                            </Col>
                            <Col md={6} className="container-2-col2">
                                <div className="guaranteed-container">
                                    <div className="gc-icon">
                                        <img
                                            className="gc-icon"
                                            src="../assets/hg-icon.png"
                                            alt="hg-icon"
                                        />
                                    </div>
                                    <br/>
                                    <h2 className="gc-heading">Happiness Guaranteed</h2>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            
            <div className="divider"></div>

            {
                !this.props.isLoggedIn ?  
                    (
                        <Container>
                            <Row>
                                <Col md={6}>
                                    <QuickSignUp />
                                </Col>
                                <Col md={6}>
                                    <img
                                        className="sign-up-img"
                                        src="../assets/sign-up.jpg"
                                        alt="service-icon"
                                        width="400"
                                    />
                                </Col>
                            </Row>
                        </Container>
                    ) : null 
            }
            
            </>
        )
    }
}

export default HomePageComponent;
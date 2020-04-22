import React, {Component, useState} from 'react';
import { Card } from 'react-bootstrap';
import './common.css';

class CardLayout extends Component{
    constructor(props){
        super(props);
        this.state = {
            showEle: false
        }
    }

    render(){
        const { img, title, text } = this.props;
        const tileClasses = this.state.showEle ? "aboutUs-card active" : "aboutUs-card";
        return(
            // <Card className="card-layout">
            //     <Card.Img className="card-img" variant="top" src={img} roundedCircle />
            //     <Card.Body>
            //         <Card.Title>{title}</Card.Title>
            //         <Card.Text>
            //             {text}
            //         </Card.Text>
            //     </Card.Body>
            // </Card>
            <div className={tileClasses}>
                <div className="about-us-tile" onClick={() => this.setState({showEle: !this.state.showEle})}>
                    <img src={img} className="tile-image"/>
                    <h1>{title}</h1>
                    <div className="tile-desc">{text}</div>
                </div>
            </div>
        )
    }
}

export default CardLayout;
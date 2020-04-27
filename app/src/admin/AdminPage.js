import React, { useEffect, useState } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import './admin.css';

const AdminPage = () => {
    let objSignature = {"id":1,"firstName":"","lastName":"","email":"","password":"","dob":null,"bio":null,"address":null}
    const [isError, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(null);
    const [items, setItems] = useState([]);
    const [statuses, setStatus] = useState([]);
    const [categories, setCategory] = useState([]);
    const [services, setServices] = useState([]);
    const [userServices, setUserServices] = useState([]);


    useEffect(() => {
        fetch('https://happy-loft.herokuapp.com/user/all')
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true)
                setItems(result)
            },
            (error) => {
                setIsLoaded(true);
                setError(true)
            }
        );

        fetch('https://happy-loft.herokuapp.com/status/all')
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true)
                setStatus(result)
            },
            (error) => {
                setIsLoaded(true);
                setError(true)
            }
        );

        fetch('https://happy-loft.herokuapp.com/category/all')
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true)
                setCategory(result)
            },
            (error) => {
                setIsLoaded(true);
                setError(true)
            }
        );

        fetch('https://happy-loft.herokuapp.com/service/fetchServices')
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true)
                setServices(result)
            },
            (error) => {
                setIsLoaded(true);
                setError(true)
            }
        );
        
        fetch('https://happy-loft.herokuapp.com/service/all')
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                setIsLoaded(true)
                setUserServices(result)
            },
            (error) => {
                setIsLoaded(true);
                setError(true)
            }
        );

    }, [])
    if (isError){
        return(
            <div>Error!</div>
        )
    }
    else if (!isLoaded){
        return(
            <div>Loading....</div>
        )
    }
    else{
        return (
            <>
            
            <div className="admin-scroll-container">
                <h1>Admin Page</h1>
                <Tabs defaultActiveKey="user">
                    <Tab eventKey="user" title="User">
                        <ul className="table-content-container">
                            <li id='0' className='table-row-header'>
                                <div className="detail">ID</div>
                                <div className="detail">Name</div>
                                <div>Bio</div>
                                <div className="detail">Email</div>
                                <div className="detail">Address</div>
                                <div className="detail">Contact</div>
                            </li>
                            {
                                items.map(item => (
                                    <li id={item.id} className='table-row'>
                                        <div className="detail">{item.id}</div>
                                        <div className="detail">{item.firstName} {item.lastName}</div>
                                        <div>{item.bio}</div>
                                        <div className="detail">{item.email}</div>
                                        <div className="detail">{item.address}</div>
                                        <div className="detail">{item.contact}</div>
                                    </li>
                                ))
                            }
                        </ul>
                    </Tab>
                <Tab eventKey="status" title="Status">
                    <ul className="table-content-container">
                            <li id='0' className='table-row-header'>
                                <div className="detail">ID</div>
                                <div className="detail">Status Name</div>
                                <div className="detail">Status Description</div>
                            </li>
                            {
                                statuses.map(status => (
                                    <li id={status.id} className='table-row'>
                                        <div className="detail">{status.id}</div>
                                        <div className="detail">{status.statusName}</div>
                                        <div className="detail">{status.statusDescription}</div>
                                    </li>
                                ))
                            }
                        </ul>
                </Tab>
                <Tab eventKey="category" title="Service Category">
                    <ul className="table-content-container">
                            <li id='0' className='table-row-header'>
                                <div className="detail">ID</div>
                                <div className="detail">Category Name</div>
                                <div className="detail">Category Description</div>
                            </li>
                            {
                                categories.map(category => (
                                    <li id={category.id} className='table-row'>
                                        <div className="detail">{category.id}</div>
                                        <div className="detail">{category.serviceCategoryName}</div>
                                        <div className="detail">{category.serviceCategoryDescription}</div>
                                    </li>
                                ))
                            }
                        </ul>
                </Tab>
                <Tab eventKey="userService" title="User Service Associative ">
                    <ul className="table-content-container">
                            <li id='0' className='table-row-header'>
                                <div className="detail">ID</div>
                                <div className="detail">User ID</div>
                                <div className="detail">Service ID</div>
                                <div className="detail">Creator</div>
                                <div className="detail">Interested</div>
                                <div className="detail">Performer</div>
                            </li>
                            {
                                userServices.map(us => (
                                    <li id={us.id} className='table-row'>
                                        <div className="detail">{us.id}</div>
                                        <div className="detail">{us.user.id}</div>
                                        <div className="detail">{us.service.id}</div>
                                        <div className="detail">{us.creator.toString()}</div>
                                        <div className="detail">{us.interested.toString()}</div>
                                        <div className="detail">{us.performer.toString()}</div>
                                    </li>
                                ))
                            }
                        </ul>
                </Tab>

                <Tab eventKey="service" title="Service ">
                    <ul className="table-content-container">
                            <li id='0' className='table-row-header'>
                                <div className="detail">ID</div>
                                <div className="detail">Service Name</div>
                                <div className="detail">Service Description</div>
                                <div className="detail">Service Location</div>
                                <div className="detail">Service Date</div>
                                <div className="detail">Service Time</div>
                                <div className="detail">Service Price</div>
                                <div className="detail">Service Status ID</div>
                                <div className="detail">Service Category ID</div>
                                <div className="detail">Service Category Other</div>
                            </li>
                            {
                                services.map(service => (
                                    <li id={service.id} className='table-row'>
                                        <div className="detail">{service.id}</div>
                                        <div className="detail">{service.serviceName}</div>
                                        <div className="detail">{service.serviceDescription}</div>
                                        <div className="detail">{service.serviceLocation}</div>
                                        <div className="detail">{service.serviceDate}</div>
                                        <div className="detail">{service.serviceTime}</div>
                                        <div className="detail">{service.servicePrice}</div>
                                        <div className="detail">{service.serviceStatus.id}</div>
                                        <div className="detail">{service.serviceCategoryID.id}</div>
                                        <div className="detail">{service.serviceCategoryOther}</div>
                                    </li>
                                ))
                            }
                        </ul>
                </Tab>
                </Tabs>
                
            </div>
            </>
        )
    }
}

export default AdminPage;
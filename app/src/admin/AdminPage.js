import React, { useEffect, useState } from 'react';
import './admin.css';

const AdminPage = () => {
    let objSignature = {"id":1,"firstName":"","lastName":"","email":"","password":"","dob":null,"bio":null,"address":null}
    const [isError, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(null);
    const [items, setItems] = useState([]);

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
        )
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
            <div className="admin-scroll-container">
                <h1>Admin Page</h1>
                <ul className="table-content-container">
                    <li id='0' className='table-row-header'>
                        <div className="detail">ID</div>
                        <div className="detail">Name</div>
                        <div>Bio</div>
                        <div className="detail">Email</div>
                        <div className="detail">DOB</div>
                    </li>
                    {
                        items.map(item => (
                            <li id={item.id} className='table-row'>
                                <div className="detail">{item.id}</div>
                                <div className="detail">{item.firstName} {item.lastName}</div>
                                <div>{item.bio}</div>
                                <div className="detail">{item.email}</div>
                                <div className="detail">{item.dob}</div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

export default AdminPage;
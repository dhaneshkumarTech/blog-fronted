import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function AdminDashboard() {
    const location = useLocation();
    const navigate = useNavigate()

    const adminName = location.state?.name;

    const [showCreaterRequest, setShowCreaterRequest] = useState(false)
    const [showConsumer, setShowConsumers] = useState(false)
    const [showCreater, setShowCreater] = useState(false)

    const [consumerData, setConsumerData] = useState([{}]);
    const [createrRequest, setCreaterRequest] = useState([{}]);
    const [createrData, setCreaterData] = useState([{}]);

    // useEffect(async () => {
    //     const token = await localStorage.getItem("token")
    //     if (!token) {
    //         navigate('/quickblog/login')    
    //     }
    // }, [])



    function logout() {
        localStorage.removeItem("token")
        navigate('/login')
    }
    function handleRequest() {
        setShowCreaterRequest(true)
        setShowConsumers(false)
        setShowCreater(false)
        axios.get(
            'http://localhost:4000/admin/creater-requests',
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
            .then((response) => {
                setCreaterRequest(response.data)
            })
            .catch((error) => {
                console.log("This is error", error)
            })

    }

    function handleCreater() {
        setShowCreaterRequest(false)
        setShowConsumers(false)
        setShowCreater(true)
        axios.get(
            'http://localhost:4000/admin/creaters',
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
            .then((response) => {
                setCreaterData(response.data)
            })
            .catch((error) => {
                console.log("This is error", error)
            })
    }
    function handleConsumer() {
        setShowCreaterRequest(false)
        setShowConsumers(true)
        setShowCreater(false)
        axios.get(
            'http://localhost:4000/admin/consumers',
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
            .then((response) => {
                setConsumerData(response.data)

            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <div className="adminheader">
                <h2 className="adminName">{adminName}</h2>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
            <div className="body">
                <div className="view-requests">
                    <button className={`creater-requests ${showCreaterRequest ? "selected" : ""}`} onClick={handleRequest}>View Creater Request</button>
                    <button className={`consumers ${showConsumer ? "selected" : ""}`} onClick={handleConsumer}>View Consumers</button>
                    <button className={`creaters ${showCreater ? "selected" : ""}`} onClick={handleCreater}>View Creaters</button>
                </div>
                <div className="user-data">
                    {showCreaterRequest && (
                        <>
                            <h3>Creater Requests</h3>
                            <ul>
                                {createrRequest.length > 0 && createrRequest.map((request, index) => (
                                    <li key={index}>
                                        <span>{request.name}</span>
                                        <div>
                                            <button className="accept-btn">Accept</button>
                                            <button className="reject-btn">Reject</button>
                                        </div>
                                    </li>
                                ))}
                                <div className="bulk-actions">
                                    <button className="accept-all-btn">Accept All</button>
                                    <button className="reject-all-btn">Reject All</button>
                                </div>
                            </ul>
                        </>
                    )}
                    {showConsumer && (
                        <>
                            <h3>Consumers</h3>
                            <ul >
                                {consumerData.length > 0 && consumerData.map((consumer, index) => (
                                    <li key={index}>
                                        <span>{consumer.name}</span>
                                        <span>{consumer.username}</span>
                                        <span>{consumer.email}</span>
                                        <span>{consumer.createrStatus}</span>
                                    </li>

                                ))}
                            </ul>
                        </>
                    )}
                    {showCreater && (
                        <>
                            <h3>Creaters</h3>
                            <ul>
                                {createrData.length > 0 && createrData.map((creater, index) => (
                                    <li key={index}>
                                        <span>{creater.name}</span>

                                        <span>{creater.username}</span>

                                        <span>{creater.email}</span>

                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard
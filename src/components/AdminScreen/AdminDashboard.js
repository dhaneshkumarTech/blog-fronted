import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate()

    const [showCreaterRequest, setShowCreaterRequest] = useState(false)
    const [showConsumer, setShowConsumers] = useState(false)
    const [showCreater, setShowCreater] = useState(false)

    const [consumerData, setConsumerData] = useState([{}]);
    const [createrRequest, setCreaterRequest] = useState([{}]);
    const [createrData, setCreaterData] = useState([{}]);

    const user = JSON.parse(localStorage.getItem("user"))

    function logout() {
        localStorage.clear()
        navigate('/login')
    }


    function handleRequest(e) {
        setShowCreaterRequest(true)
        setShowConsumers(false)
        setShowCreater(false)
        e.preventDefault();

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
                throw error(error)
            })

    }

    function handleCreater(e) {
        setShowCreaterRequest(false)
        setShowConsumers(false)
        setShowCreater(true)
        e.preventDefault();
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
                throw error(error)
            })
    }
    function handleConsumer(e) {
        setShowCreaterRequest(false)
        setShowConsumers(true)
        setShowCreater(false)
        e.preventDefault();

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
                throw error(error)
            })
    }

    function updateCreaterStataus(id, status) {
        axios.patch('http://localhost:4000/admin//update-creater-status',
            {
                userId: id,
                requestStatus: status
            },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }

            }
        )
            .then((response) => {
                setCreaterRequest(response.data.users)
            })
            .catch((error) => {
                throw error(error)
            })
    }


    function updateAllCreaterStataus(status) {
        axios.patch('http://localhost:4000/admin//update-all-creaters-status', { requestStatus: status },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }

            }
        )
            .then((response) => {
                setCreaterRequest(response.data.users)
            })
            .catch((error) => {
                throw error(error)
            })
    }

    return (
        <div>
            <div className="adminheader">
                <h2 className="adminName">{user && user.name}</h2>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
            <div className="body">
                <div className="view-requests">
                    <button className={`creater-requests ${showCreaterRequest ? "selected" : ""}`} onClick={handleRequest}>View Creater Request</button>
                    <button className={`consumers ${showConsumer ? "selected" : ""}`} onClick={handleConsumer}>View Consumers</button>
                    <button className={`creaters ${showCreater ? "selected" : ""}`} onClick={handleCreater}>View Creaters</button>
                </div>
                <div className="user-data">
                    {showCreaterRequest && createrRequest[0] && (
                        <>
                            <h3>Creater Requests</h3>
                            <ul>
                                {createrRequest.length > 0 && createrRequest.map((request, index) => (
                                    <li key={index}>
                                        <span>{request.name}</span>
                                        <div>
                                            <button className="accept-btn" onClick={() => updateCreaterStataus(request._id, "Accepted")}>Accept</button>
                                            <button className="reject-btn" onClick={() => updateCreaterStataus(request._id, "Rejected")}>Reject</button>
                                        </div>
                                    </li>
                                ))}
                                <div className="bulk-actions">
                                    <button className="accept-all-btn" onClick={() => updateAllCreaterStataus("Accepted")}>Accept All</button>
                                    <button className="reject-all-btn" onClick={() => updateAllCreaterStataus("Rejected")}>Reject All</button>
                                </div>
                            </ul>

                        </>
                    )}
                    {showCreaterRequest && !createrRequest[0] && <h5>No request is Pending</h5>}

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
        </div >
    );
}

export default AdminDashboard
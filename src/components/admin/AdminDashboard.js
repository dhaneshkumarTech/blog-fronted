import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function AdminDashboard() {
    const [showCreaterRequest, setShowCreaterRequest] = useState(false)
    const [showConsumer, setShowConsumers] = useState(false)
    const [showCreater, setShowCreater] = useState(false)

    const location = useLocation();
    const adminName = location.state?.data;
    let consumerData;
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
                console.log("here is data: ", response.data)
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
                console.log("here is data: ", response.data)
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
                console.log("here is data: ", response.data)
                consumerData = response.data
            })
            .catch((error) => {
                console.log("This is error", error)
            })
    }

    return (
        <div>
            <div className="adminheader">
                <h2 className="adminName">{adminName}</h2>
                <button className="logout-btn">Logout</button>
            </div>
            <div className="body">
                <div className="view-requests">
                    <button className="creater-requests" onClick={handleRequest}>View Creater Request</button>
                    <button className="consumers" onClick={handleConsumer}>View Consumers</button>
                    <button className="creaters" onClick={handleCreater}>View Creaters</button>
                </div>
                <div className="user-data">
                    {showCreaterRequest && <ul>
                        <li>
                            <span>John</span>
                            <div>
                                <button className="accept-btn">Accept</button>
                                <button className="reject-btn">Reject</button>
                            </div>
                        </li>
                        <li>
                            <span>Marie</span>
                            <div>
                                <button className="accept-btn">Accept</button>
                                <button className="reject-btn">Reject</button>
                            </div>
                        </li>
                        <li>
                            <span>Hitman</span>
                            <div>
                                <button className="accept-btn">Accept</button>
                                <button className="reject-btn">Reject</button>
                            </div>
                        </li>
                        <div className="bulk-actions">
                            <button className="accept-all-btn">Accept All</button>
                            <button className="reject-all-btn">Reject All</button>
                        </div>
                    </ul>}



                    {showConsumer && (
                        <ul>
                            {consumerData.map((item, index) => (
                                <li key={index}>{item.name}</li>
                            ))}
                        </ul>
                    )}

                    {showCreater && <ul>
                        <li>Smith</li>
                        <li>Maria</li>
                        <li>Ratiko</li>
                    </ul>
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
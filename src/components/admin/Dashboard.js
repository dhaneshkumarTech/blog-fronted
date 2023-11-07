import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosWraper from '../../utils/axiosWraper'
import Footer from "../Footer";

function AdminDashboard() {
    const navigate = useNavigate()

    const [Tabs, setTabs] = useState({
        createrRequest: false,
        consumer: false,
        creater: false
    })

    const [createrRequest, setCreaterRequest] = useState([{}]);
    const [createrData, setCreaterData] = useState([{}]);
    const [consumerData, setConsumerData] = useState([{}]);


    const user = JSON.parse(localStorage.getItem("user"))
    const authHeader = { authorization: `Bearer ${localStorage.getItem("token")}` }


    function logout() {
        localStorage.clear()
        navigate('/login')
    }

    const handleCreaterRequest = async (e) => {
        e.preventDefault()

        setTabs((prevTab) => ({
            ...prevTab,
            createrRequest: true,
            consumer: false,
            creater: false
        }))

        const responseData = await axiosWraper.axiosRequest('get', 'http://localhost:4000/admin/creater-requests', {}, authHeader)
        setCreaterRequest(responseData)
    }

    const Creater = async (e) => {
        e.preventDefault()

        setTabs((prevTab) => ({
            ...prevTab,
            creater: true,
            createrRequest: false,
            consumer: false
        }))

        const responseData = await axiosWraper.axiosRequest('get', 'http://localhost:4000/admin/creaters', {}, authHeader)
        setCreaterData(responseData)
    }

    const Consumer = async (e) => {

        e.preventDefault()
        setTabs((prevTab) => ({
            ...prevTab,
            consumer: true,
            createrRequest: false,
            creater: false
        }))

        const responseData = await axiosWraper.axiosRequest('get', 'http://localhost:4000/admin/consumers', {}, authHeader)
        setConsumerData(responseData)

    }

    const updateCreaterStataus = async (id, status) => {
        const userData = {
            userId: id,
            requestStatus: status
        }

        const responseData = await axiosWraper.axiosRequest('patch', 'http://localhost:4000/admin//update-creater-status', userData, authHeader)
        setCreaterData(responseData.users)
    }


    const updateAllCreaterStataus = async (status) => {
        const responseData = await axiosWraper.axiosRequest('patch', 'http://localhost:4000/admin//update-all-creaters-status', { requestStatus: status }, authHeader)
        setCreaterData(responseData.users)
    }

    return (
        <div>
            <div className="adminheader">
                <h2 className="adminName">{user && user.name}</h2>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
            <div className="body">
                <div className="view-requests">
                    <button className={`creater-requests ${Tabs.createrRequest ? "selected" : ""}`} onClick={handleCreaterRequest}>View Creater Request</button>
                    <button className={`consumers ${Tabs.consumer ? "selected" : ""}`} onClick={Consumer}>View Consumers</button>
                    <button className={`creaters ${Tabs.creater ? "selected" : ""}`} onClick={Creater}>View Creaters</button>
                </div>
                <div className="user-data">
                    {Tabs.createrRequest && createrRequest[0] && (
                        <>
                            <h3 className="tab-title">Creater Requests</h3>
                            <ul className="creater-request-list">
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
                    {Tabs.createrRequest && !createrRequest[0] && <h5>No request is Pending</h5>}

                    {Tabs.consumer && (
                        <>
                            <h3 className="tab-title">Consumers</h3>
                            <ul className="consumer-list">
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
                    {Tabs.creater && (
                        <>
                            <h3 className="tab-title">Creaters</h3>
                            <ul className="creater-list">
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
            <Footer />
        </div >
    );
}

export default AdminDashboard
import React from "react";
import { useNavigate } from "react-router-dom";

import Footer from '../Footer'
import Blog from "../blog/Blog";
import axiosWraper from "../../utils/axiosWraper";

const ConsumerDashboard = () => {
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'))
    const authHeader = { authorization: `Bearer ${localStorage.getItem("token")}` }

    function logout() {
        localStorage.clear()
        navigate('/login')
    }

    const requestForCreater = async () => {
        const response = await axiosWraper.axiosRequest('patch', 'http://localhost:4000/users/creater-request', {}, authHeader)
        alert(`${response.message}`)
    }

    return (
        <div>
            <div className="adminheader">
                <h2 className="adminName"> {user && user.name}</h2>
                <div className="header-btn">
                    <button className="register-btn" onClick={requestForCreater}>Become Creater</button>
                    <button className="login-btn" onClick={logout}>Logout</button>
                </div>
            </div>
            <Blog user="consumer" />
            <Footer />
        </div>
    )
}

export default ConsumerDashboard
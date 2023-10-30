import React from "react";
import { useNavigate } from "react-router-dom";

import Footer from '../Footer'
import Blog from "../blog/Blog";
const CreaterDashboard = () => {
    const navigate = useNavigate()



    function logout() {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <div>
            <div className="adminheader">
                <h2 className="adminName">Daani</h2>
                <div className="header-btn">
                    <button className="register-btn" onClick={() => navigate('/login')}>Post Blog</button>
                    <button className="login-btn" onClick={logout}>Logout</button>
                </div>
            </div>
            <Blog user="creater" />
            <Footer />
        </div>
    )
}

export default CreaterDashboard
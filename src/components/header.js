import React from "react";
import { useNavigate } from "react-router-dom";
function Header() {
    const navigate = useNavigate()
    return (
        <header className="header">
            <h2 className="title" onClick={() => navigate('/')}>Quick Blog</h2>
            <div>
                <div className="header-btn">
                    <button className="register-btn" onClick={() => navigate('/register')}>Register</button>
                    <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
                </div>
            </div>

        </header>
    )
}

export default Header
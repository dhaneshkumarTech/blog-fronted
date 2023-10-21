import React from "react";

function Header() {
    function Register(){}
    function Login(){}
    return (
        <div className="header">
            <h2 className="title">Quick Blog</h2>
            <div className="header-btn">
                <button className="register" onClick={Register}>Register</button>
                <button className="login" onClick={Login}>Login</button>
            </div>
        </div>
    )
}

export default Header
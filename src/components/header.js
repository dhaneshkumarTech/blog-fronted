import React, { useState } from "react";

import Register from "./register";
import Login from "./login";

function Header() {
    const [isRegistered, setIsRegistered] = useState(false)
    function clickRegister() {
        setIsRegistered(false)
    }
    function clickLogin() {
        setIsRegistered(true)
    }
    return (
        <div >
            <div className="header">
                <h2 className="title">Quick Blog</h2>
                <div className="header-btn">
                    <button className="register-btn" onClick={clickRegister}>Register</button>
                    <button className="login-btn" onClick={clickLogin}>Login</button>
                </div>
            </div>
            <div className="forms" >
                {!isRegistered && < Register />}
                {isRegistered && < Login />}

            </div>
        </div>
    )
}

export default Header
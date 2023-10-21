import React from "react";

function Login() {
    return (
        <div className="register">
            <form className="register-form">
                <div className="username">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter username" required />
                </div>
                <div className="password">
                    <label>Password</label>
                    <input type="password" name="password" required />
                </div>
                <input type="Submit" />
            </form>
        </div>
    )
}

export default Login
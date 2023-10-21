import React from "react";

function Register() {
    return (
        <div className="register">
            <form className="register-form">
                <div className="name">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Enter name" required />
                </div>
                <div className="username">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter username" required />
                </div>
                <div className="email">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Enter email" required />
                </div>
                <div className="password">
                    <label>Password</label>
                    <input type="password" name="password" required />
                </div>
                <div className="confirm-password">
                    <label>Confirm Password</label>
                    <input type="password" name="confirm-password" required />
                </div>
                <input type="Submit" />
            </form>
        </div>
    )
}

export default Register
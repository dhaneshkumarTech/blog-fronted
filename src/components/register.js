import React, { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";


function Register() {
    const navigate = useNavigate()
    const [registerData, setRegisterData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setRegisterData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleRegister = (e) => {
        e.preventDefault();

        axios.post('http://localhost:4000/users/register', registerData)
            .then(() => {
                navigate('/login')
            })
            .catch((err) => {
                console.log("this is error", err)
            })

    }

    return (
        <div> <div className="header">
            <h2 className="title">Quick Blog</h2>
            <div>
                <Link to="/login" className="login-btn" >Login</Link>
            </div>
        </div>
            <div className="register">

                <form className="register-form" onSubmit={handleRegister}>
                    <div className="name">
                        <label>Name</label>
                        <input type="text" name="name" required value={registerData.name} onChange={handleChange} placeholder="Enter name" />
                    </div>
                    <div className="username">
                        <label>Username</label>
                        <input type="text" name="username" required value={registerData.username} onChange={handleChange} placeholder="Enter username" />
                    </div>
                    <div className="email">
                        <label>Email</label>
                        <input type="email" name="email" required value={registerData.email} onChange={handleChange} placeholder="Enter email" />
                    </div>
                    <div className="password">
                        <label>Password</label>
                        <input type="password" name="password" required value={registerData.password} onChange={handleChange} />
                    </div>
                    <div className="confirm-password">
                        <label>Confirm Password</label>
                        <input type="password" name="confirm-password" required />
                    </div>
                    <button type="Submit">Register</button>

                </form>
            </div>
        </div>
    )
}

export default Register
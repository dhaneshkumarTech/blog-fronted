import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



function Login() {

    const navigate = useNavigate()
    const [loginData, setLoginData] = useState(
        {
            email: "",
            password: ""
        }
    )

    const handleChange = e => {
        const { name, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/users/login', loginData)
            .then((response) => {
                localStorage.setItem("token", response.data.token)
                const user = response.data.user
                if (user.role === "admin") {
                    navigate('/quickblog/admindashboard',
                        {
                            state: { name: user.name }
                        }
                    );
                }
                if (user.role === "creater")
                    navigate('/dashborad')
                if (user.role === "consumer") {
                    navigate('/admindashborad')
                }

            })
            .catch((err) => {

                console.log(err)
            })
    }

    return (
        <div>
            <div className="header">
                <h2 className="title">Quick Blog</h2>
                <div>
                    <Link to="/register" className="register-btn" >Register</Link>
                </div>
            </div>
            <div className="register">
                <form className="register-form" onSubmit={handleLogin}>
                    <div className="email">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
                    </div>
                    <div className="password">
                        <label>Password</label>
                        <input type="password" name="password" onChange={handleChange} required />
                    </div>
                    <button type="Submit" >Login</button>

                </form>
            </div>
        </div>
    )
}

export default Login
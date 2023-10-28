import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";



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
                const user = response.data.user
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", JSON.stringify(user))
                if (user.role === "admin") {
                    navigate('/admindashboard')
                }
                if (user.role === "creater") { }
                if (user.role === "consumer") { }
            })
            .catch((error) => {
                throw error(error)
            })
    }
    return (
        <div>
            <div>
                <Header />
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
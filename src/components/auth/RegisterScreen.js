import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Header";
import axiosWraper from "../../utils/axiosWraper";
import Footer from "../Footer";


function Register() {
    const navigate = useNavigate()

    const [registerData, setRegisterData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const Register = async (e) => {
        e.preventDefault();
        await axiosWraper.axiosRequest('post', 'http://localhost:4000/users/register', registerData)
        navigate('/login');
    }

    return (
        <>
            <Header />
            <div className="register">

                <form className="register-form" onSubmit={Register}>
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
            <Footer />
        </>
    )
}

export default Register
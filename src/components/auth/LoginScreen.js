import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import axiosWraper from "../../utils/axiosWraper";
import Footer from "../Footer";



function LoginScreen() {
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

    const Login = async (e) => {
        e.preventDefault();
        const responseData = await axiosWraper.axiosRequest('post', 'http://localhost:4000/users/login', loginData)
        const user = responseData.user
        localStorage.setItem("token", responseData.token)
        localStorage.setItem("user", JSON.stringify(user))
        if (user.role === "admin") {
            navigate('/admindashboard')
        }
        if (user.role === "creater") {
            navigate('/users/creater')
        }
        if (user.role === "consumer") {
            navigate('/users/consumer')
        }

    }


    return (
        <>
            <Header />
            <div className="register">
                <form className="register-form" onSubmit={Login}>
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
            <Footer />
        </>
    )
}

export default LoginScreen
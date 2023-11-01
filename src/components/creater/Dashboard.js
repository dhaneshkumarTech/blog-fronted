import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from '../Footer'
import Blog from "../blog/Blog";
import axiosWraper from "../../utils/axiosWraper";

const CreaterDashboard = () => {

    const [isPosting, setIsPosting] = useState(false)
    const [blogData, setBlogData] = useState(
        {
            title: "",
            content: ""
        }
    )

    const navigate = useNavigate()

    const handleChange = e => {
        const { name, value } = e.target;
        setBlogData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const user = JSON.parse(localStorage.getItem('user'))
    const authHeader = { authorization: `Bearer ${localStorage.getItem("token")}` };

    function logout() {
        localStorage.clear()
        navigate('/login')
    }

    const Posting = () => {
        setIsPosting(true)
    }
    const postBlog = async (e) => {
        e.preventDefault();


        await axiosWraper.axiosRequest('post', 'http://localhost:4000/blogs', blogData, authHeader);
        setIsPosting(false)
    }
    return (
        <div>
            <div className="adminheader">
                <h2 className="adminName">{user.name}</h2>
                <div className="header-btn">
                    <button className="register-btn" onClick={Posting}>Post Blog</button>
                    <button className="login-btn" onClick={logout}>Logout</button>
                </div>
            </div>
            {isPosting &&
                <form className="blog-form" onSubmit={postBlog}>
                    <div className="title">
                        <label className="blog-title">Title</label>
                        <input type="text" name="title" onChange={handleChange} required />
                    </div>
                    <div className="content">
                        <label className="blog-title">Content</label>
                        <textarea className="textarea" name="content" onChange={handleChange} required > </ textarea>
                    </div>
                    <button className="post-btn">Post Blog</button>
                </form>
            }
            {!isPosting && <Blog user="creater" />}
            <Footer />
        </div >
    )
}

export default CreaterDashboard
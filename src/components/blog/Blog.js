import React, { useState, useEffect } from "react";

import axiosWraper from "../../utils/axiosWraper";
import BlogCard from "./BlogCard";

const Blog = (props) => {
    const [activeTab, setActiveTab] = useState("Blogs");
    const [allBlogs, setAllBlogs] = useState([]);
    const [userBlogs, setUserBlogs] = useState([]);
    const authHeader = { authorization: `Bearer ${localStorage.getItem("token")}` };
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        setActiveTab("Blogs");
        const getBlogs = async () => {
            try {
                const response = await axiosWraper.axiosRequest('get', 'http://localhost:4000/blogs', {}, authHeader);
                setAllBlogs(response);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        getBlogs();
    }, []);

    const blogs = async (name) => {
        setActiveTab(name);

        if (name === 'MyBlogs') {
            const response = await axiosWraper.axiosRequest('get', 'http://localhost:4000/blogs/userblogs', {}, authHeader, { userId: user._id });
            setUserBlogs(response);
        }
    }
    return (
        <div>
            <button
                className={`tablink ${activeTab === "Blogs" ? "active" : ""} ${props.user !== "creater" ? "full-width" : ""}`}
                onClick={() => blogs("Blogs")}
            >
                Blogs
            </button>
            {props.user === "creater" && <button
                className={`tablink ${activeTab === "MyBlogs" ? "active" : ""}`}
                onClick={() => blogs("MyBlogs")}
            >
                My Blogs
            </button>}

            <div className="tabcontent" style={{ display: activeTab === "Blogs" ? "block" : "none" }}>
                <div className="blog-container">
                    {allBlogs && Array.isArray(allBlogs) && allBlogs.map((blog, index) => (
                        <BlogCard key={index} id={blog._id} title={blog.title} author={blog.author} content={blog.content} likes={blog.likeCount} comments={blog.comments} />
                    ))}

                    {!allBlogs && <h3>No blogs are available.</h3>}
                </div>
            </div>

            <div className="tabcontent" style={{ display: activeTab === "MyBlogs" ? "block" : "none" }}>
                <div className="blog-container">
                    {userBlogs && Array.isArray(userBlogs) && userBlogs.map((blog, index) => (
                        <BlogCard key={index} id={blog._id} title={blog.title} author={blog.author} content={blog.content} likes={blog.likeCount} comments={blog.comments} />
                    ))}
                    {!userBlogs && <h3>No blogs are available.</h3>}
                </div>
            </div>
        </div>
    );
};

export default Blog;

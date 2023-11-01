import React, { useState } from "react";

import axiosWraper from "../../utils/axiosWraper";

const BlogCard = ({ id, title, author, content, likes, comments }) => {

    const [like, setLike] = useState(likes)
    const [userComments, setUserComments] = useState(comments)
    const [commentForm, setCommentForm] = useState(false)
    const [commentContent, setCommentContent] = useState({ content: "" })

    const authHeader = { authorization: `Bearer ${localStorage.getItem("token")}` }

    const likeBlog = async (blogId) => {
        const response = await axiosWraper.axiosRequest('post', `http://localhost:4000/blogs/${blogId}/like`, {}, authHeader)
        setLike(response.likes)
    }

    const showComment = () => {
        setCommentForm(true)
        setCommentForm(!commentForm)
    }

    const handleChange = e => {
        const value = e.target.value;
        setCommentContent(prevState => ({
            ...prevState,
            content: value
        }));

    };

    const postComment = async (blogId) => {
        const response = await axiosWraper.axiosRequest('post', `http://localhost:4000/blogs/${blogId}/comment`, commentContent, authHeader)
        if (response.error) {
            setCommentForm(false)
            alert('already commented')
        }
        else {
            setUserComments(response.comments)
            setCommentForm(false)
        }
    }
    return (
        <div className="blog-post">
            <h2 className="blog-title">{title}</h2>
            <p className="blog-author">By: {author}</p>
            <div className="blog-content">{content}</div>
            <div className="blog-actions">
                <button className="like-button" onClick={() => likeBlog(id)}>Like ({like})</button>
                <button className="comment-button" onClick={showComment} >Comment</button>

            </div>
            <div className="blog-comments">
                {commentForm && <form onSubmit={() => postComment(id)} className="commentForm">
                    <input type="textarea" name="content" onChange={handleChange} required />
                    <button type="Submit">Post</button>
                </form>
                }
                {userComments[0] && <h3>Comments:</h3>}

                {Array.isArray(userComments) && userComments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p><strong>{comment.name}:</strong> {comment.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogCard;

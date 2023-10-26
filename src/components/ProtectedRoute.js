import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    const { Component } = props
    const navigate = useNavigate()
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        }
        setIsLoggedIn(true)
    }, [navigate])

    return (
        <div>
            {isLoggedIn && <is Component />}
        </div>
    )
}

export default ProtectedRoute
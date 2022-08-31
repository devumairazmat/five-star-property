// React
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Layouts
import GuestLayout from '../../layouts/GuestLayout';

// Utils
import { baseApiUrl } from '../../utils/fetchApi';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const setUserItem = (user, token) => {
        localStorage.setItem('name', user.name);
        localStorage.setItem('username', user.username);
        localStorage.setItem('email', user.email);
        localStorage.setItem('role', user.role);
        localStorage.setItem('image', user.image);
        localStorage.setItem('token', token);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`${baseApiUrl}/login`, {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            let { user, token, message } = await response.json();
            if (response.status !== 200) return alert(message);
            setUserItem(user, token);
            window.alert(message);
            if (response.status === 200) navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <GuestLayout title="Register">
            <div className="card card-user">
                <div className="card-body card-user p-4">
                    <form method="POST" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input type="email" className="form-control" id="email" name="email" value={loginData.email} onChange={handleChange} placeholder="Email..." required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input type="password" className="form-control" id="password" name="password" value={loginData.password} onChange={handleChange} placeholder="Password..." required />
                        </div>
                        <button type="submit" className="btn btn-block btn-primary mt-5">
                            Login
                        </button>
                        <Link to="/register" className="btn btn-block btn-outline-primary">
                            Don't have an Account?
                        </Link>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Login;

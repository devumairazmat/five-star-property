// React
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Layouts
import GuestLayout from '../../layouts/GuestLayout';

// Utils
import { baseApiUrl } from '../../utils/fetchApi';

const Register = () => {
    const [registerData, setRegisterData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`${baseApiUrl}/register`, {
                method: 'POST',
                body: JSON.stringify(registerData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            let { message } = await response.json();
            window.alert(message);
            if (response.status === 201) navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <GuestLayout title="Register">
            <div className="card card-user">
                <div className="card-body card-user p-4">
                    <form method="POST" onSubmit={handleRegister}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Full Name
                            </label>
                            <input type="text" className="form-control" id="name" name="name" value={registerData.name} onChange={handleChange} placeholder="Full Name..." required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input type="text" className="form-control" id="username" name="username" value={registerData.username} onChange={handleChange} placeholder="Username..." required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input type="email" className="form-control" id="email" name="email" value={registerData.email} onChange={handleChange} placeholder="Email..." required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input type="password" className="form-control" id="password" name="password" value={registerData.password} onChange={handleChange} placeholder="Password..." required />
                        </div>
                        <button type="submit" className="btn btn-block btn-primary mt-5">
                            Register
                        </button>
                        <Link to="/login" className="btn btn-block btn-outline-primary">
                            Have an Account?
                        </Link>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Register;

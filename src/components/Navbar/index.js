// React
import React from 'react';
import { Cart as CartIcon, DistributeVertical, GeoAltFill } from 'react-bootstrap-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// CSS
import './index.css';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleLogout = () => {
        if (window.confirm('Are you sure?')) {
            localStorage.clear();
            return navigate('/login');
        }
    };

    return (
        <nav className="navbar navbar-expand-md fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <GeoAltFill fill="var(--primary-color)" />
                    <span className="ml-2">Five Star Property</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon">
                        <DistributeVertical />
                    </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-md-auto">
                        <Link to="/#home" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                            Home
                        </Link>
                        <Link to="/properties" className={`nav-link ${location.pathname.includes('/properties') ? 'active' : ''}`}>
                            Properties
                        </Link>
                        {token === null ? (
                            <>
                                <Link to="/login" className="nav-link ml-md-5">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-user btn-primary shadow-sm mt-3 mt-md-0">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/carts" className={`nav-link ${location.pathname.includes('/carts') ? 'active' : ''}`}>
                                    <CartIcon />
                                    <span className="mx-2">Cart</span>
                                    <span className="badge badge-pill badge-primary">2</span>
                                </Link>
                                <Link to="/dashboard" className="btn btn-user btn-primary shadow-sm mt-3 mt-md-0 ml-md-5">
                                    Dashboard
                                </Link>
                                <button className="btn btn-user nav-link" onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

// React
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Properties from '../pages/Properties';
import Property from '../pages/Properties/Property';
import Cart from '../pages/Cart';
import Dashboard from '../pages/Admin/Dashboard';

const Router = () => {
    return (
        <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/properties" element={<Properties />} />
            <Route exact path="/properties/single" element={<Property />} />
            <Route exact path="/carts" element={<Cart />} />

            <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
};

export default Router;

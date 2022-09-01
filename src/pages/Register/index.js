// React
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slices/Auth";

// Layouts
import GuestLayout from "../../layouts/GuestLayout";

// Utils
import { baseApiUrl } from "../../utils/fetchApi";

const Register = () => {
  const dispatch = useDispatch();
  const [registerData, setRegisterData] = useState({
    fName: "",
    lName: "",
    userName: "",
    phone: "",
    email: "",
    password: "",
  });
  console.log(registerData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(register(registerData));
  };

  return (
    <GuestLayout title="Register">
      <div className="card card-user">
        <div className="card-body card-user p-4">
          <form method="POST" onSubmit={handleRegister}>
            {/* f name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="fName"
                value={registerData.fName}
                onChange={handleChange}
                placeholder="First Name..."
                required
              />
            </div>
            {/* L name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lame"
                name="lName"
                value={registerData.lName}
                onChange={handleChange}
                placeholder="Last Name..."
                required
              />
            </div>
            {/* username */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="userName"
                value={registerData.userName}
                onChange={handleChange}
                placeholder="Username..."
                required
              />
            </div>
            {/* phone */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={registerData.phone}
                onChange={handleChange}
                placeholder="Phone..."
                required
              />
            </div>
            {/* email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={registerData.email}
                onChange={handleChange}
                placeholder="Email..."
                required
              />
            </div>
            {/* password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={registerData.password}
                onChange={handleChange}
                placeholder="Password..."
                required
              />
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

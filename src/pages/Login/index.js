// React
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/Auth";

// Layouts
import GuestLayout from "../../layouts/GuestLayout";

// Utils
import { baseApiUrl } from "../../utils/fetchApi";

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loginData, setLoginData] = useState({
    idType: "",
    userId: "",
    password: "",
  });
  console.log(loginData);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  return (
    <GuestLayout title="Register">
      <div className="card card-user">
        <div className="card-body card-user p-4">
          <form method="POST" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="pb-2" htmlFor="idType">
                Login With
              </label>
              <select
                className="form-control form-select form-control-a"
                id="idType"
                name="idType"
                onChange={handleChange}
                required
              >
                <option value={""} className="text-a">
                  select an option
                </option>
                <option value={"userName"}>username</option>
                <option value={"email"}>email</option>
                <option value={"phone"}>phone</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label"></label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="userId"
                value={loginData.userId}
                onChange={handleChange}
                placeholder=""
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Password..."
                required
              />
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

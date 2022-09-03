// React
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// CSS
import "./index.css";

const GuestLayout = (props) => {
  document.title = `${props.title ? props.title : ""} - Five Star Property`;

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      return navigate("/");
    }
  }, []);

  return (
    <section id="auth">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <Link to="/" className="text-primary">
              Back to Home
            </Link>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12">{props.children}</div>
        </div>
      </div>
    </section>
  );
};

export default GuestLayout;

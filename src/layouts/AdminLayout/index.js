// React
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import AdminFooter from "../../components/AdminFooter";
import LogoutModal from "../../components/LogoutModal";

// CSS
import "./index.css";

const AdminLayout = (props) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  document.title = `${props.title ? props.title : ""} - Real Estate`;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <>
      <div id="wrapper">
        <AdminSidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <AdminNavbar />
            {props.children}
          </div>
          <AdminFooter />
        </div>
      </div>

      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>

      <LogoutModal />
    </>
  );
};

export default AdminLayout;

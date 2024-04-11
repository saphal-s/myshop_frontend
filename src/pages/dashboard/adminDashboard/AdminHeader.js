import React from "react";
import { FaBars } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../../redux/features/authSlice";

const AdminHeader = () => {
  const distpatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    distpatch(setLogout());
    navigate("/");
  };
  return (
    <div className="admin_header">
      <div className="header_title">
        <FaBars className="aicon" /> Dashboard
      </div>
      <div className="header_auth" onClick={handleLogout}>
        <CiLogout className="aicon" /> Logout
      </div>
    </div>
  );
};

export default AdminHeader;

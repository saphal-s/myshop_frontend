import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoIosSearch, IoMdCart } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../../redux/features/authSlice";
import "./style.css";

const TopNav = () => {
  const [text, setText] = useState("");

  const { user } = useSelector((state) => state.auth);
  const distpatch = useDispatch();

  const navigate = useNavigate();

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // console.log(user);
  const handleLogout = () => {
    distpatch(setLogout());
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?text=${text}`);
  };
  return (
    <div className="top_nav_bar">
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <h2>Hamro Shop</h2>
          </Link>
        </div>
        <div className="search_bar">
          <form>
            <input
              type="text"
              name="text"
              placeholder="Search..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <IoIosSearch onClick={handleSubmit} className="search_icon" />
          </form>
        </div>
        <div className="create_account_cart">
          {!user ? (
            <div className="sing_in">
              <Link to="/register" className="link">
                <FaUserAlt className="icon" /> Sign In/ Create Account
              </Link>
            </div>
          ) : (
            <div className="user_dropdown">
              <li className="user_nav">
                <FaUserAlt /> {user?.user.name}
                <ul className="dropdown">
                  <li>Setting</li>
                  <Link to="/user/dashboard" className="link">
                    <li>Dashboard</li>
                  </Link>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </li>
            </div>
          )}

          <div className="cart">
            <Link to="/cart" className="link">
              <IoMdCart className="icon" />
              <sup>{cartItems ? cartItems.length : 0}</sup> Shopping Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;

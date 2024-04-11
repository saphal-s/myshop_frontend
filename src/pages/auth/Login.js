import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { login, resetError } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import TopNav from "../../components/header/TopNav";
import SecondHeader from "../../components/header/SecondHeader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
    dispatch(resetError());
  }, [error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" && password === "") {
      toast.error("Email & Password is required");
    } else {
      dispatch(login({ state: { email, password }, navigate, toast }));
    }
  };

  return (
    <>
      <TopNav />
      <SecondHeader />
      <div className="from_section">
        <div className="container">
          <h4>
            <MdLogin size={30} /> <br /> Login
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="form_label">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div className="form_label">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <div className="button">
              <button>Login</button>
            </div>
          </form>
          <div className="form_footer">
            <p>
              Don't have an account ? <Link to="/register">Register.</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

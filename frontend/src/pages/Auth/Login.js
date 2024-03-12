import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  //form submit function

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name,email,address,phone,password);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("went wrong in handlesubmit function");
    }
    // toast.success('login successfully completed')
  };

  return (
    <Layout title="register">
      <div className="register">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email"
              className="form-control"
              id="exampleInputEmail"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter your password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>

          <div
            className=" d-flex flex-column m">
            <button
              type="button"
              className="btn btn-dark mb-2"
              onClick={() => navigate("/forgot-password")}>
              Forgot Password
            </button>

            <button type="submit" className="btn btn-dark mr-3">
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;

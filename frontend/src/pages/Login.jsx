import react from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../Utils";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email, Password Required");
    }
    try {
      const url = "https://mern-authentication-eight.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("logedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        handleError(error);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error?.message || "something went wrong during Login");
      console.error("Login error", error);
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoFocus
            required
            id="email"
            value={loginInfo.email}
            placeholder="Enter Your Email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            required
            value={loginInfo.password}
            placeholder="Enter Your Password"
          />
        </div>
        <button type="submit">Login</button>
        <div>
          <span>
            Don't Have an account <Link to="/signup">Signup</Link>
          </span>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import "../styles/Login.css"; // Import the CSS file
import Lottie from "react-lottie";
import AnimationData from "../animations/animation_lkwqejy3.json";
import AnimationData1 from "../animations/animation_lkwtfi5v.json";
import success from '../animations/success.json';
import { useNavigate } from "react-router-dom";




const users = [
  { username: "1", password: "1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
];

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const delayed = async () => {
   
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const delayTime = 1000; // 2 seconds

    // Wait for the specified delay
    await delay(delayTime);

    navigate("/");
  };

  const handleLogin = () => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      setIsLoggedIn(true);
      setLoginError(false);
      delayed();
     
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setLoginError(false);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimationData,
    speed:1
  };
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: AnimationData1,
  };
  const success1 = {
    loop: true,
    autoplay: true,
    animationData: success,
  };

  return (
    <div className="wrapper">
      <div className="lottie-animation">
        <Lottie options={defaultOptions} isClickToPauseDisabled />
      </div>
      <div className="lottie-animation" id="lottie-1">
        <Lottie options={defaultOptions1} width={300} height={300} isClickToPauseDisabled />
      </div>

      <div className="container">
        {loginError && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
           <strong>Invalid username or password!</strong> 
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setLoginError(false)}></button>
        </div>
        )}
        <h1 id="h1">Login</h1>
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="User ID"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </div>
        <button className="login-btn" id="login-btn" onClick={handleLogin}>
          Login
        </button>
        {isLoggedIn &&
        <div className="lottie-animation" id="lottie-1">
        <Lottie options={success1} isClickToPauseDisabled width={300} height={300} />
      </div>}
      </div>
    </div>
  );
};

export default LoginForm;

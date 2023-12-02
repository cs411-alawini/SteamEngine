// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../api/user";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const onButtonClick = async () => {
    setUsernameError("");
    setPasswordError("");

    if ("" === username) {
      setUsernameError("Please enter your username");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    try {
      console.log("username", username)
      console.log("password", password)
      const response = await loginUser(username, password);
      console.log("response", response)

      if (response.status === 200) {
        props.setLoggedIn(true);
        props.setUsername(username);
        navigate("/"); 
      } else {
        setPasswordError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setPasswordError("Invalid Login");
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
    </div>
  );
};


export default Login
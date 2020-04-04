import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import loginService from "./service/loginService";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import TogglableButton from "./components/TogglableButton";
import communicationService from "./components/CommunicationNotes";

const AppPart1 = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      communicationService.setToken(user.token);
    }
  }, []);

  const handleLogout = event => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const handleLoginUsername = ({ target }) => setUsername(target.value);

  const handleLoginPassword = ({ target }) => setPassword(target.value);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      communicationService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const ErrorMessage = () => {
    if (errorMessage === "") return <div></div>;
    return (
      <div className="error">
        <p>{errorMessage}</p>
      </div>
    );
  };

  const blogForm = () => {
    return (
      <div>
        <p>
          {user.username} has logged in{" "}
          <input type="button" value="Logout" onClick={handleLogout} />
        </p>
        <br />
        <BlogForm
          errorMessage={ErrorMessage}
          setErrorMessage={setErrorMessage}
          username={username}
        />
        <br />
      </div>
    );
  };

  const mainForm = () => {
    if (user === null) {
      return (
        <div>
          <LoginForm
            handleLoginUsername={handleLoginUsername}
            handleLoginPassword={handleLoginPassword}
            handleLogin={handleLogin}
            username={username}
            password={password}
          />
        </div>
      );
    } else {
      return <div>{blogForm()}</div>;
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ErrorMessage />
      {mainForm()}
    </div>
  );
};

export default AppPart1;

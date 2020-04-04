import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Filter from "./components/Filter";
import communicationService from "./components/CommunicationNotes";
import "./index.css";
import loginService from "./service/loginService";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import TogglableButton from "./components/TogglableButton";

const AppPart1 = () => {
  const [newBlog, setNewBlog] = useState({});
  const [personList, setPersonList] = useState([]);
  const [selection, setSelection] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const blogFormRef = React.createRef();

  useEffect(() => {
    communicationService.getAll().then(response => {
      setPersonList(response.data);
    });
  }, []);

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

  const handleFilter = event => {
    setSelection(event.target.value);
  };

  const handleAddPerson = event => {
    event.preventDefault();
    const blogEntry = {
      title: newBlog.newTitleEntry,
      author: newBlog.newAuthorEntry,
      likes: newBlog.newNumberEntry,
      url: newBlog.newURLEntry
    };
    blogFormRef.current.toggleVisibility();
    var blogExists = personList.find(blog => blog.title === blogEntry.title);

    if (blogExists != null) {
      blogEntry.id = blogExists.id;
      handleUpdate(blogEntry);
    } else {
      communicationService
        .insert(blogEntry)
        .then(newPerson => {
          setPersonList(personList.concat(newPerson));
          setNewBlog({});
        })
        .catch(error => {
          console.log("Error message is triggered: ");
          console.log(error.response.data);
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        });
    }
  };

  const handleUpdate = blog => {
    var updateConfirm = window.confirm(
      blog.title + " is already added. Do you want to update records?"
    );
    if (updateConfirm === true) {
      communicationService
        .update(blog)
        .then(response => {
          setPersonList(
            personList.map(entry =>
              entry.id === blog.id
                ? {
                    ...entry,
                    author: blog.author,
                    url: blog.url,
                    likes: blog.likes
                  }
                : entry
            )
          );
          setNewBlog({});
        })
        .catch(err => setErrorMessage(err));
    }
  };

  const handleDeleteEntry = person => {
    var deleteConfirm = window.confirm("Delete " + person.title + " ?");
    if (deleteConfirm === true) {
      communicationService
        .delete(person.id)
        .then(setPersonList(personList.filter(entry => entry.id != person.id)))
        .catch(error => {
          alert(`the person '${person.title} does not exist'`);
        });
    }
  };

  const DisplayNumbers = () => {
    return (
      <div>
        <h2>Numbers</h2>
        <ul>
          {personList.map((person, index) => (
            <li key={index}>
              {person.title} has this many {person.likes} likes{" "}
              <button id={index} onClick={handleDeleteEntry.bind(this, person)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
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
        <TogglableButton buttonLabel="create note" ref={blogFormRef}>
          <BlogForm
            errorMessage={ErrorMessage}
            username={username}
            newBlog={newBlog}
            setNewBlog={setNewBlog}
            handleAddPerson={handleAddPerson}
          />
        </TogglableButton>
        <br />
        <Filter
          personList={personList}
          selection={selection}
          handleFilter={handleFilter}
        />
        <DisplayNumbers />
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

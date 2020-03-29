import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Filter from "./components/Filter";
import communicationService from "./components/CommunicationNotes";
import "./index.css";
import loginService from "./service/loginService";

const AppPart1 = () => {
  const [newTitleEntry, setNewTitleEntry] = useState("");
  const [newAuthorEntry, setNewAuthorEntry] = useState("");
  const [newURLEntry, setNewURLEntry] = useState("");
  const [newNumberEntry, setNewNumberEntry] = useState(0);
  const [personList, setPersonList] = useState([]);
  const [selection, setSelection] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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

  const handleAddTitle = event => {
    setNewTitleEntry(event.target.value);
  };
  const handleAddAuthor = event => {
    setNewAuthorEntry(event.target.value);
  };
  const handleAddURL = event => {
    setNewURLEntry(event.target.value);
  };
  const handleAddNumber = event => {
    setNewNumberEntry(event.target.value);
  };
  const handleAddPerson = event => {
    event.preventDefault();
    const personEntry = {
      title: newTitleEntry,
      author: newAuthorEntry,
      likes: newNumberEntry,
      url: newURLEntry
    };
    var personExists = personList.find(
      person => person.title === personEntry.title
    );

    if (personExists != null) {
      personEntry.id = personExists.id;
      handleUpdate(personEntry);
    } else {
      communicationService
        .insert(personEntry)
        .then(newPerson => {
          setPersonList(personList.concat(newPerson));
          setNewTitleEntry("");
          setNewAuthorEntry("");
          setNewURLEntry("");
          setNewNumberEntry("");
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
          setNewTitleEntry("");
          setNewAuthorEntry("");
          setNewURLEntry("");
          setNewNumberEntry("");
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

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const blogForm = () => {
    return (
      <div>
        <ErrorMessage />
        <p>{user.username} has logged in</p>
        <input type="button" value="Logout" onClick={handleLogout} />
        filter shown with{" "}
        <input value={selection} onChange={handleFilter}></input>
        <Filter personList={personList} selection={selection} />
        <h2> Add a new</h2>
        <form onSubmit={handleAddPerson}>
          <div>
            Title: <input value={newTitleEntry} onChange={handleAddTitle} />
          </div>
          <div>
            Author: <input value={newAuthorEntry} onChange={handleAddAuthor} />
          </div>
          <div>
            URL: <input value={newURLEntry} onChange={handleAddURL} />
          </div>
          <div>
            Likes: <input value={newNumberEntry} onChange={handleAddNumber} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <DisplayNumbers />
      </div>
    );
  };
  return (
    <div>
      <h1>Phonebook</h1>
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  );
};

export default AppPart1;

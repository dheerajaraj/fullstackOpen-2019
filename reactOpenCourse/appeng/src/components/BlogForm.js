import React, { useState, useEffect, Component } from "react";
import communicationService from "./CommunicationNotes";
import Filter from "./Filter";
import TogglableButton from "./TogglableButton";

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({});
  const [personList, setPersonList] = useState([]);
  const [selection, setSelection] = useState("");
  const blogFormRef = React.createRef();

  useEffect(() => {
    communicationService.getAll().then(response => {
      setPersonList(response.data);
    });
  }, []);

  const handleFilter = event => {
    setSelection(event.target.value);
  };

  const handleAddTitle = ({ target }) => {
    setNewBlog({
      ...newBlog,
      newTitleEntry: target.value
    });
  };
  const handleAddAuthor = ({ target }) => {
    setNewBlog({
      ...newBlog,
      newAuthorEntry: target.value
    });
  };
  const handleAddURL = ({ target }) => {
    setNewBlog({
      ...newBlog,
      newURLEntry: target.value
    });
  };
  const handleAddNumber = ({ target }) => {
    setNewBlog({
      ...newBlog,
      newNumberEntry: target.value
    });
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
          this.props.setErrorMessage(error.response.data.error);
          setTimeout(() => {
            this.props.setErrorMessage("");
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
        .catch(err => this.props.setErrorMessage(err));
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

  return (
    <div>
      <Filter
        personList={personList}
        selection={selection}
        handleFilter={handleFilter}
      />
      <TogglableButton buttonLabel="create new note" ref={blogFormRef}>
        <h2> Add a new</h2>
        <form onSubmit={handleAddPerson}>
          <div>
            Title:{" "}
            <input value={newBlog.newTitleEntry} onChange={handleAddTitle} />
          </div>
          <div>
            Author:{" "}
            <input value={newBlog.newAuthorEntry} onChange={handleAddAuthor} />
          </div>
          <div>
            URL: <input value={newBlog.newURLEntry} onChange={handleAddURL} />
          </div>
          <div>
            Likes:{" "}
            <input value={newBlog.newNumberEntry} onChange={handleAddNumber} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </TogglableButton>
      <DisplayNumbers />
    </div>
  );
};

export default BlogForm;

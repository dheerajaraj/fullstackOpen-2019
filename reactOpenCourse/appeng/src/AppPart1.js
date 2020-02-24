import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Filter from "./components/Filter";
import communicationService from "./components/CommunicationNotes";
const AppPart1 = () => {
  const [newNameEntry, setNewNameEntry] = useState("");
  const [newNumberEntry, setNewNumberEntry] = useState("");
  const [personList, setPersonList] = useState([]);
  const [selection, setSelection] = useState("");

  const handleAddName = event => {
    setNewNameEntry(event.target.value);
  };
  const handleAddNumber = event => {
    setNewNumberEntry(event.target.value);
  };
  const handleAddPerson = event => {
    event.preventDefault();
    const personEntry = {
      name: newNameEntry,
      number: newNumberEntry
    };
    communicationService
      .insert(personEntry)
      .then(newPerson => {
        setPersonList(personList.concat(newPerson));
        setNewNameEntry("");
        setNewNumberEntry("");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleFilter = event => {
    setSelection(event.target.value);
  };

  const handleDeleteEntry = person => {
    var deleteConfirm = window.confirm("Delete " + person.name + " ?");
    if (deleteConfirm === true) {
      communicationService
        .delete(person.id)
        .then(setPersonList(personList.filter(entry => entry.id != person.id)))
        .catch(error => {
          alert(`the person '${person.name} does not exist'`);
        });
    }
  };

  useEffect(() => {
    communicationService.getAll().then(response => {
      setPersonList(response.data);
    });
  }, []);

  const DisplayNumbers = () => {
    return (
      <div>
        <ul>
          {personList.map((person, index) => (
            <li key={index}>
              {person.name} {person.number}{" "}
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
      <h1>Phonebook</h1>
      filter shown with{" "}
      <input value={selection} onChange={handleFilter}></input>
      <Filter personList={personList} selection={selection} />
      <h2> Add a new</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newNameEntry} onChange={handleAddName} />
        </div>
        <div>
          number: <input value={newNumberEntry} onChange={handleAddNumber} />
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

export default AppPart1;

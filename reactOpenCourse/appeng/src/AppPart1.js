import React, { useState } from "react";
import ReactDOM from "react-dom";
import Parts from "./components/Parts";
import Numbers from "./components/Numbers";
const AppPart1 = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const handlePhoneDetailsChange = event => {
    setNewName(event.target.value);
  };
  const addPersonToList = event => {
    event.preventDefault();
    if (checkDuplicates(newName))
      alert(`${newName} is already added to phonebook`);
    else {
      setPersons(persons.concat({ name: newName }));
    }
    setNewName("");
  };
  const checkDuplicates = personToAdd => {
    const notSearched = persons.filter(person => person.name === personToAdd);
    console.log(personToAdd);
    console.log("notSearched: " + notSearched);
    if (notSearched.length === 0) return false;
    else {
      return true;
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersonToList}>
        <div>
          name: <input value={newName} onChange={handlePhoneDetailsChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers personList={persons} />
    </div>
  );
};

export default AppPart1;

import React, { useState } from "react";
import ReactDOM from "react-dom";
import Parts from "./components/Parts";
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
const AppPart1 = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "+65 83638035" }
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setPhone] = useState("");
  const [filtered, setFilteredList] = useState([]);

  const handleNameDetailsChange = event => {
    setNewName(event.target.value);
  };
  const handlePhoneDetailsChange = event => {
    setPhone(event.target.value);
  };

  const addPersonToList = event => {
    event.preventDefault();
    if (checkDuplicates(newName))
      alert(`${newName} is already added to phonebook`);
    else {
      setPersons(persons.concat({ name: newName, phone: newPhone }));
    }
    setNewName("");
    setPhone("");
  };

  const checkDuplicates = personToAdd => {
    const notSearched = persons.filter(person => person.name === personToAdd);
    if (notSearched.length === 0) return false;
    else {
      return true;
    }
  };

  const handleFilter = event => {
    const filteredList = persons.filter(
      person => event.target.value === person.name
    );
    setFilteredList(filteredList);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} filtered={filtered} />
      <h3>Add a new</h3>
      <PersonForm
        handleNameDetailsChange={handleNameDetailsChange}
        handlePhoneDetailsChange={handlePhoneDetailsChange}
        addPersonToList={addPersonToList}
        newName={newName}
        newPhone={newPhone}
      />
      <h3>Numbers</h3>
      <Numbers personList={persons} />
    </div>
  );
};

export default AppPart1;

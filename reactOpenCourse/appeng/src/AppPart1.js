import React, { useState } from "react";
import ReactDOM from "react-dom";
import Parts from "./components/Parts";
import Numbers from "./components/Numbers";
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
  const displayFilter = filtered.map((person, index) => (
    <li key={index}>
      {person.name} {person.phone}
    </li>
  ));

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input onChange={handleFilter} />
        {displayFilter}
      </div>
      <form onSubmit={addPersonToList}>
        <div>
          name: <input value={newName} onChange={handleNameDetailsChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneDetailsChange} />
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

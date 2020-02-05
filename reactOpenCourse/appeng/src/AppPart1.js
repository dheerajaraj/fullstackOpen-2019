import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const AppPart1 = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/notes").then(response => {
      setNotes(response.data);
    });
  }, []);

  const noteList = notes.map((note, index) => (
    <li key={index}>
      {note.content} <br />
      {note.date} <br />
      {note.important} <br />
    </li>
  ));
  return <div>{noteList}</div>;
};

export default AppPart1;

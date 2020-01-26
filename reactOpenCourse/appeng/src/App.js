import React from "react";
import logo from "./logo.svg";
import "./App.css";
const HelloMsg = props => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  );
};

function App() {
  const now = new Date();
  const a = 10;
  const b = 20;
  const name = "dheeraj";
  const age = 25;
  return (
    <div className="App">
      <HelloMsg name={name} age={age} />
      <p>Hello World it is {now.toString()}</p>
      <p>
        {a} plus {b} equals {a + b}
      </p>
    </div>
  );
}

export default App;

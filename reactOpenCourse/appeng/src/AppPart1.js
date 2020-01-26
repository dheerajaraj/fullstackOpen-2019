import React from "react";
import logo from "./logo.svg";
import "./App.css";

const Header = props => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = props => {
  return (
    <div>
      {props.content.map(item => (
        <p>
          {item.name} {item.exercises}
        </p>
      ))}
    </div>
  );
};

const Total = props => {
  function addUp(total, num) {
    return total + num.exercises;
  }
  return (
    <div>
      <p>{props.exercises1.reduce(addUp, null)}</p>
    </div>
  );
};
function AppPart1() {
  const course = "Half Stack application development";
  const part1 = [
    {
      name: "Fundamentals of React",
      exercises: 10
    },
    {
      name: "Using props to pass data",
      exercises: 7
    },
    {
      name: "State of a component",
      exercises: 14
    }
  ];

  return (
    <div>
      <Header course={course} />
      <Content content={part1} />
      <Total exercises1={part1} />
    </div>
  );
}
export default AppPart1;

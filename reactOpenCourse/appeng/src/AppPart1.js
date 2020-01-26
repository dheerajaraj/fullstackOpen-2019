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
      <p>
        {props.content.name} {props.content.exercises}
      </p>
    </div>
  );
};

const Total = props => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.exercises1 + props.exercises2 + props.exercises3}
      </p>
    </div>
  );
};
function AppPart1() {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7
  };
  const part3 = {
    name: "State of a component",
    exercises: 14
  };

  return (
    <div>
      <Header course={course} />
      <Content content={part1} />
      <Content content={part2} />
      <Content content={part3} />
      <Total
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
    </div>
  );
}
export default AppPart1;

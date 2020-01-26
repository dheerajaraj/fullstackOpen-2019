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
        {props.contentName} {props.exercise}
      </p>
      <p>
        {props.contentName} {props.exercise2}
      </p>
      <p>
        {props.contentName} {props.exercise3}
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
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        contentName={part1}
        exercise={exercises1}
        exercise2={exercises2}
        exercise3={exercises3}
      />

      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
}
export default AppPart1;

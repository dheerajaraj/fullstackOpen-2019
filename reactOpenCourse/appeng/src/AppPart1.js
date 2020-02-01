import React, { useState } from "react";
import ReactDOM from "react-dom";
import Parts from "./components/Parts";
const AppPart1 = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3
      }
    ]
  };

  return (
    <div>
      <h1>{course.name}</h1>
      <Parts course={course} />
    </div>
  );
};

export default AppPart1;

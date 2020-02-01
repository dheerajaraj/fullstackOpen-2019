import React, { Component } from "react";

class Parts extends Component {
  render() {
    const result = this.props.course.parts.map(course => (
      <li key={course.id}>
        {course.name} {course.exercises}
      </li>
    ));
    const totalResult = this.props.course.parts.reduce(function(
      total,
      currVal
    ) {
      return { exercises: total.exercises + currVal.exercises }; // need to be field of same name
    });

    return (
      <div>
        <h1>{this.props.course.name}</h1>
        <ul>
          {result}
          <p>Total of {totalResult.exercises} exercises</p>
        </ul>
      </div>
    );
  }
}
export default Parts;

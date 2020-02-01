import React, { Component } from "react";

class Parts extends Component {
  render() {
    return this.props.course.parts.map(course => (
      <li key={course.id}>
        {course.name} {course.exercises}
      </li>
    ));
  }
}
export default Parts;

import React, { Component } from "react";

class componentName extends Component {
  render() {
    const result = this.props.personList.map((person, index) => (
      <li key={index}>{person.name}</li>
    ));
    return (
      <div>
        <ul>{result}</ul>
      </div>
    );
  }
}
export default componentName;

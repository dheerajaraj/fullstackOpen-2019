import React, { Component } from "react";

class Filter extends Component {
  render() {
    return (
      <div>
        {this.props.personList.map((person, index) =>
          person.name === this.props.selection ? (
            <li key={index}>
              {person.name} {person.number}
            </li>
          ) : (
            ""
          )
        )}
      </div>
    );
  }
}
export default Filter;

import React, { Component } from "react";

class Filter extends Component {
  render() {
    return (
      <div>
        Filter blog by title:
        <input
          value={this.props.selection}
          onChange={this.props.handleFilter}
        ></input>
        {this.props.personList.map((person, index) =>
          person.title === this.props.selection ? (
            <li key={index}>
              {person.title} {person.author} {person.url} {person.likes}
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

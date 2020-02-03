import React, { Component } from "react";

class Filter extends Component {
  render() {
    const displayFilter = this.props.filtered.map((person, index) => (
      <li key={index}>
        {person.name} {person.phone}
      </li>
    ));
    return (
      <div>
        filter shown with: <input onChange={this.props.handleFilter} />
        {displayFilter}
      </div>
    );
  }
}
export default Filter;

import React, { Component } from "react";

class componentName extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.addPersonToList}>
          <div>
            name:{" "}
            <input
              value={this.props.newName}
              onChange={this.props.handleNameDetailsChange}
            />
          </div>
          <div>
            number:{" "}
            <input
              value={this.props.newPhone}
              onChange={this.props.handlePhoneDetailsChange}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    );
  }
}
export default componentName;

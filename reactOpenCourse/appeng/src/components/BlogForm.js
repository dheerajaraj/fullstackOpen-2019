import React, { Component } from "react";

class BlogForm extends Component {
  render() {
    const handleAddTitle = ({ target }) => {
      this.props.setNewBlog({
        ...this.props.newBlog,
        newTitleEntry: target.value
      });
    };
    const handleAddAuthor = ({ target }) => {
      this.props.setNewBlog({
        ...this.props.newBlog,
        newAuthorEntry: target.value
      });
    };
    const handleAddURL = ({ target }) => {
      this.props.setNewBlog({
        ...this.props.newBlog,
        newURLEntry: target.value
      });
    };
    const handleAddNumber = ({ target }) => {
      this.props.setNewBlog({
        ...this.props.newBlog,
        newNumberEntry: target.value
      });
    };

    return (
      <div>
        {this.props.errorMessage}
        <h2> Add a new</h2>
        <form onSubmit={this.props.handleAddPerson}>
          <div>
            Title:{" "}
            <input
              value={this.props.newBlog.newTitleEntry}
              onChange={handleAddTitle}
            />
          </div>
          <div>
            Author:{" "}
            <input
              value={this.props.newBlog.newAuthorEntry}
              onChange={handleAddAuthor}
            />
          </div>
          <div>
            URL:{" "}
            <input
              value={this.props.newBlog.newURLEntry}
              onChange={handleAddURL}
            />
          </div>
          <div>
            Likes:{" "}
            <input
              value={this.props.newBlog.newNumberEntry}
              onChange={handleAddNumber}
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

export default BlogForm;

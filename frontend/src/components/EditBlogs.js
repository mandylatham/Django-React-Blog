import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBlogs } from "../actions/blogs";

export class EditBlogsForm extends Component {
  toggleONP = () => {
    this.props.toggleOpenNewPage();
  };

  toggleHOP = () => {
    this.props.toggleHideOnUpdate();
  };

  onSubmit = (e) => {
    e.preventDefault();
    const updatedTitle = this.getTitle.value;
    const updatedDescription = this.getDescription.value;
    const data = {
      title: updatedTitle,
      description: updatedDescription,
    };
    this.props.updateBlogs(this.props.cloneId, data);
    this.toggleBlogsEdits(); 
    this.toggleHOP();
    this.toggleONP();
  };

  toggleBlogsEdits = () => {    
    this.props.toggleEditing();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h3>Update Blog</h3>
          <label>
            Title <i className="fas fa-marker"></i>
          </label>
          <input
            type="text"
            autoFocus={true}
            className="form-control"
            placeholder="update title"
            ref={(input) => (this.getTitle = input)}
            onChange={this.onChange}
            defaultValue={this.props.cloneTitle}
            required
          />
          <br />
          <label>
            Description <i className="fas fa-marker"></i>
          </label>
          <textarea
            className="form-control"
            placeholder="udpate description"
            ref={(input) => (this.getDescription = input)}
            onChange={this.onChange}
            defaultValue={this.props.cloneDescription}
            rows="18"
            cols="41"
            required
          />
          <br />
          <button className="btn btn-success" type="submit">
            Save Changes
          </button>
          <button
            className="btn btn-danger ml-2"
            onClick={() => {
              this.toggleBlogsEdits();
              this.toggleHOP();
            }}
          >
            cancel
          </button>
          <hr />
        </form>
        <br />
      </div>
    );
  }
}

export default connect(null, { updateBlogs })(EditBlogsForm);

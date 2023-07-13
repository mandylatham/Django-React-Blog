import React, { Component } from "react";
import { connect } from "react-redux";
import { getBlogs, deleteBlogs,likeBlogs, unlikeBlogs} from "../actions/blogs";
import EditBlogs from "./EditBlogs";
import NewPage from "./NewPage";

export class Blogs extends Component {
  // managing state for update functionality
  state = {
    cloneId: 0,
    cloneTitle: "",
    cloneDescription: "",
    cloneLikes: 0,
    cloneUnlikes: 0,
    editing: false,
    hideBlogsDuringUpdate: false,
    openNewPage: false,
    MAX_LENGTH: 250, // per blog
  };

  // new page
  newPage = (blog) => {
    this.setState({
      cloneId: blog.id,
      cloneTitle: blog.title,
      cloneLikes: blog.likes,
      cloneUnlikes: blog.unlikes,
      cloneDescription: blog.description,
      openNewPage: true,
    });
  };

  // toggle hideBlogsDuringUpdate state
  toggleHideOnUpdate = () => {
    this.setState({
      hideBlogsDuringUpdate: !this.state.hideBlogsDuringUpdate,
    });
  };
 
  // calling the api to fetch items
  componentDidMount = () => {
    this.props.getBlogs();
  }

  // handle edits function
  handleEdits = (blog) => {
    this.setState({
      cloneId: blog.id,
      cloneTitle: blog.title,
      cloneDescription: blog.description,
      cloneLikes: blog.likes,
      cloneUnlikes: blog.unlikes,
      editing: !this.state.editing,
    });
  };

  handleLikes = (blog) => {
    const like = blog.likes + 1;
    const data  = {
      likes : like
    }
    this.props.likeBlogs(blog.id, data);
  };

  handleUnlikes = (blog) => {
    const unlike = blog.unlikes + 1;
    const data  = {
      unlikes : unlike
    }
    this.props.likeBlogs(blog.id, data);
  };


  // toggle form Editing
  toggleEditing = () => {
    this.setState({
      editing: false,
    });
  };

  // toggle open new page
  toggleOpenNewPage = () => {
    this.setState({
      openNewPage: false,
    });
  };

  render() {
    return (
      <div className="container">
        {this.state.editing ? (
          <EditBlogs
            cloneId={this.state.cloneId}
            cloneTitle={this.state.cloneTitle}
            cloneLikes={this.state.likes}
            cloneUnlikes={this.state.unlikes}
            cloneDescription={this.state.cloneDescription}
            toggleEditing={this.toggleEditing}
            toggleHideOnUpdate={this.toggleHideOnUpdate}
            toggleOpenNewPage={this.toggleOpenNewPage}
          />
        ) : (
          ""
        )}
        {this.state.hideBlogsDuringUpdate || this.props.hideAllBlogs ? (
          ""
        ) : (
          <div>
            {this.state.openNewPage ? (
              <NewPage
                cloneId={this.state.cloneId}
                cloneTitle={this.state.cloneTitle}
                cloneDescription={this.state.cloneDescription}
                clonelikes={this.state.likes}
                cloneUnlikes={this.state.unlikes}
                handleEdits={this.handleEdits}
                toggleHideOnUpdate={this.toggleHideOnUpdate}
              />
            ) : (
              <div>
                <h3>All Blogs</h3>
                {this.props.blogs.map((blog) => (
                  <div
                    className="card body card-spacing text-white bg-dark"
                    key={blog.id}
                  >
                    <h4>{blog.title}</h4>
                    <p>likes: {blog.likes}&nbsp;unlikes: {blog.unlikes}</p>
                    <hr className="new1"></hr>

                    {blog.description.length > this.state.MAX_LENGTH ? (
                      <div>
                        {`${blog.description.substring(
                          0,
                          this.state.MAX_LENGTH
                        )}...`}
                        <span onClick={this.toggleBlogLength}></span>
                      </div>
                    ) : (
                      <p className="justify-description-css">
                        {blog.description}
                      </p>
                    )}

                    {/* Like Blog */}

                    <span
                      className="span-button"
                      onClick={() => {
                        this.handleLikes(blog);
                      }}
                    >
                      <i className="like-button fas fa-thumbs-up fa-2x ml-2 button-css" />
                    </span>
                    
                    {/* Unlike Blog */}

                    <span
                      className="span-button"
                      onClick={() => {
                        this.handleUnlikes(blog);
                      }}
                    >
                      <i className="unlike-button fas fa-thumbs-down fa-2x ml-2 button-css" />
                    </span>

                    {/* Edit Blog */}

                    <span
                      className="span-button"
                      onClick={() => {
                        this.handleEdits(blog);
                        this.toggleHideOnUpdate();
                      }}
                    >
                      <i className="edit-button far fa-edit fa-2x button-css" />
                    </span>

                    {/* full blog */}
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.newPage(blog);
                      }}
                    >
                      view blog
                    </button>

                    {/* Delete Blog */}

                    <span
                      className="span-button"
                      onClick={this.props.deleteBlogs.bind(this, blog.id)}
                    >
                      <i className="delete-button fas fa-trash fa-2x ml-2 button-css" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blogs: state.blogs.blogs
});

export default connect(mapStateToProps, { getBlogs,deleteBlogs,likeBlogs,unlikeBlogs })(Blogs);

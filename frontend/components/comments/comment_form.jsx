import React from 'react';
import { CommentFormItem } from './comment_form_item';

class CommentForm extends React.Component {
componentWillMount() {
  this.props.requestComments(this.props.photo.id);
}

  constructor(props) {
    super(props);
    this.state = {
      body: "",
      owner_id: this.props.currentUser,
      photo_id: this.props.photo.id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(type) {
    return (event) => {
      this.setState({ [type]: event.target.value });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const formComment = this.state;
    if(this.state.body) {
      this.props.postComment(formComment).then(this.setState({body: ""}));
    }
  }

  renderComments() {
    return (
      <div className="comments-scroll">
        <ul>
          {this.props.comments.map (comment => (
            <CommentFormItem key={comment.id} comment={comment} />
          ))}
        </ul>
      </div>
    );
  }

  render () {
    const { currentUser, photo } = this.props;

    return(
      <div className="comment-form-container">
        {/* <form className="comment-form" onSubmit={this.handleSubmit}> */}
        <div className="comment-form">
          { this.renderComments() }
          <div className="comment-div">
            <textarea type="text"
              value={this.state.body}
              onChange={this.handleInput('body')}
              placeholder="Add Comment"
            />
            {/* <input type="submit" value="Add Comment" /> */}
            <button onClick={this.handleSubmit}>Add Comment</button>
          </div>
        </div>
        {/* </form> */}
      </div>
    );
  }
}

export default CommentForm;

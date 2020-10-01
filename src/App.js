import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/roastboast/")
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data }));
  }
  render() {
    return (
      <div>
        <h1>Posts</h1>
        <ul>
          {this.state.posts.map((post) => (
            <li key={post.toString()}>
              <p>
                <h2>{post.post_type}</h2>
              </p>
              <p>
                <strong>Content:</strong> {post.content}
              </p>
              <p>
                <strong>Vote Score:</strong> {post.total_votes}
              </p>
              <p>
                <strong>Created:</strong> {post.create_time}
              </p>
              <p>
                <strong>Updated:</strong> {post.update_time}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;

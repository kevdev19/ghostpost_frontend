import React from "react";
import "./App.css";
import upvote from "./img/upvote.png";
import downvote from "./img/downvote.png";

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
              <button
                type="button"
                style={{
                  backgroundImage: `url(${upvote})`,
                  backgroundRepeat: "no-repeat",
                  height: "35px",
                  width: "35px",
                  margin: "2px",
                }}
              ></button>
              <button
                type="button"
                style={{
                  backgroundImage: `url(${downvote})`,
                  backgroundRepeat: "no-repeat",
                  height: "35px",
                  width: "35px",
                }}
              ></button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;

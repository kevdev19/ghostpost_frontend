import React from "react";
import "./App.css";
import upvote from "./img/upvote.png";
import downvote from "./img/downvote.png";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      currentOrdering: "oldest",
      isOldestFirst: true,
    };
  }
  // handleUpVote = (e, id) => {
  //   e.preventDefault();
  //   console.log(id);
  //   this.state.posts.map((post) => {
  //     if (post.id === id) {

  //       this.setState({

  //       })
  //     }
  //   });
  // };

  handleUpVote = (event, postid) => {
    event.preventDefault();
    const newPostList = this.state.posts.map((post) => {
      if (post.id === postid) {
        return {
          ...post,
          up_vote: post.up_vote + 1,
          total_votes: post.total_votes + 1,
        };
      }
      return post;
    });
    this.setState({ posts: newPostList });
  };
  handleDownVote = (event, postId) => {
    event.preventDefault();
    const newPostList = this.state.posts.map((post) => {
      if (post.id === postId) {
        return { ...post, down_vote: post.down_vote - 1 };
      }
      return post;
    });
    this.setState({ posts: newPostList });
  };

  handleMostPopularSort = (event) => {
    const { posts } = this.state;
    let newPopularData = posts
      .sort((a, b) => a.total_votes - b.total_votes)
      .reverse();
    console.log(newPopularData);
    this.setState({
      posts: newPopularData,
    });
  };
  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/roastboast/")
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data }));
  }
  render() {
    const ColoredLine = ({ color }) => (
      <hr
        style={{
          color: color,
          backgroundColor: color,
          height: 2,
        }}
      />
    );
    return (
      <div>
        <h1>Posts</h1>
        <ul style={{ listStyle: "none" }}>
          <li>
            <a href="#">All Posts</a>
          </li>
          <li>
            <a href="#">Filter by Boasts</a>
          </li>
          <li>
            <a href="#">Filter by Roasts</a>
          </li>
          <li>
            <a href="#" onClick={(e) => this.handleMostPopularSort()}>
              Most Popular
            </a>
          </li>
          <li>
            <a href="#">Create Post</a>
          </li>
        </ul>
        <ul style={{ listStyleType: "none" }}>
          {this.state.posts.map((post) => (
            <li key={post.id}>
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
                onClick={(e) => this.handleUpVote(e, post.id)}
                style={{
                  backgroundImage: `url(${upvote})`,
                  backgroundRepeat: "no-repeat",
                  height: "35px",
                  width: "35px",
                  margin: "5px",
                }}
              ></button>
              {post.up_vote}
              <button
                type="button"
                onClick={(e) => this.handleDownVote(e, post.id)}
                style={{
                  backgroundImage: `url(${downvote})`,
                  backgroundRepeat: "no-repeat",
                  height: "35px",
                  width: "35px",
                  margin: "5px",
                }}
              ></button>
              {post.down_vote}
              <ColoredLine color="gray" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;

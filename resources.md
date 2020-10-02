How to add Images in React.js
https://reactgo.com/react-images/

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

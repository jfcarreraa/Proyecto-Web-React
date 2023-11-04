import React from "react";

const Post = ({ post, user, onPostClick }) => {
  return (
    <div className="post" onClick={() => onPostClick(post)}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Published by: {user.firstName}</p>{" "}
      <ul>
        {post.tags && <li>Tags: {post.tags.join(", ")}</li>}
        <li>Reactions: {post.reactions}</li>
      </ul>
    </div>
  );
};

export default Post;

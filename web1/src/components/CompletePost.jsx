import React, { useState, useEffect } from "react";

const CompletePost = ({ post, user }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/comments")
      .then((response) => response.json())
      .then((data) => {
        const postComments = data.comments.filter(
          (comment) => comment.postId === post.id
        );
        setComments(postComments);
      })
      .catch((error) => {
        console.error("Error fetching comments: ", error);
      });
  }, [post.id]);

  return (
    <div className="post" key={post.id}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Published by: {user.firstName}</p>
      <ul>
        {post.tags && <li>Tags: {post.tags.join(", ")}</li>}
        <li>Reactions: {post.reactions}</li>
      </ul>

      <h3>Comments:</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompletePost;

import React from "react";

const Tag = ({ tag, posts, onClose }) => {
  return (
    <div className="tag-modal">
      <h2>Posts with Tag: {tag}</h2>
      <ul className="tag-list">
        {posts.map((post) => (
          <li key={post.id} className="tag-post">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Tag;

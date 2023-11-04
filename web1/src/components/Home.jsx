import React, { useState, useEffect } from "react";
import Post from "./Post";
import "../styles/styles.scss";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [postsToShow, setPostsToShow] = useState(5);
  // eslint-disable-next-line
  const [postsToLoad, setPostsToLoad] = useState(5);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setAllPosts(data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts: ", error);
      });
  }, []);

  const filteredPosts = allPosts.filter((post) => post.userId === user.id);

  const showPosts = () => {
    setShowAllPosts(!showAllPosts);
  };

  const showMorePosts = () => {
    setPostsToShow(postsToShow + postsToLoad);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const closePostModal = () => {
    setSelectedPost(null);
  };

  return (
    <div>
      <h1>{showAllPosts ? "All Posts" : "Your Posts"}</h1>
      <button onClick={showPosts}>Toggle Posts</button>
      <ul>
        {showAllPosts
          ? allPosts
              .slice(0, postsToShow)
              .map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  user={user}
                  onPostClick={handlePostClick}
                />
              ))
          : filteredPosts.map((post) => (
              <Post
                key={post.id}
                post={post}
                user={user}
                onPostClick={handlePostClick}
              />
            ))}
      </ul>
      {showAllPosts && postsToShow < allPosts.length && (
        <button onClick={showMorePosts}>Load More</button>
      )}
      {selectedPost && (
        <div className="post-modal">
          <div className="modal-content">
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.body}</p>
            <p>Published by: {user.firstName}</p>
            <ul>
              {selectedPost.tags && (
                <li>Tags: {selectedPost.tags.join(", ")}</li>
              )}
              <li>Reactions: {selectedPost.reactions}</li>
            </ul>
            <button onClick={closePostModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

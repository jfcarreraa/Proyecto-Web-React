import React, { useState, useEffect } from "react";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import "../styles/styles.scss";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [postsToShow, setPostsToShow] = useState(10);
  // eslint-disable-next-line
  const [postsToLoad, setPostsToLoad] = useState(5);
  // eslint-disable-next-line
  const [selectedPost, setSelectedPost] = useState(null);

  const navigate = useNavigate();

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
    navigate(`/post/${post.id}`, { state: { post } });
  };

  return (
    <div>
      <h1>{showAllPosts ? "All Posts" : "Your Posts"}</h1> {/* esto se divide en los post mios y todos los post */}
      <button onClick={showPosts}>Toggle Posts</button>
      
      <ul className="grid-list" >
        {showAllPosts
          ? allPosts
              .slice(0, postsToShow)
              .map((post) => (
                <li>
                  <Post
                  key={post.id}
                  post={post}
                  user={user}
                  onPostClick={handlePostClick}
                />
                </li>
              ))
          : filteredPosts.map((post) => (
              <li>
                <Post
                key={post.id}
                post={post}
                user={user}
                onPostClick={handlePostClick}
              />
              </li>
            ))}
      </ul>
      {showAllPosts && postsToShow < allPosts.length && (
        <button onClick={showMorePosts}>Load More</button>
      )}
    </div>
  );
};

export default Home;

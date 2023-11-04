import React, { useState, useEffect } from "react";
import Post from "./Post";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [postsToShow, setPostsToShow] = useState(5);
  // eslint-disable-next-line
  const [postsToLoad, setPostsToLoad] = useState(5);

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

  return (
    <div>
      <h1>{showAllPosts ? "All Posts" : "Your Posts"}</h1>
      <button onClick={showPosts}>Toggle Posts</button>
      <ul>
        {showAllPosts
          ? allPosts
              .slice(0, postsToShow)
              .map((post) => <Post key={post.id} post={post} user={user} />)
          : filteredPosts.map((post) => (
              <Post key={post.id} post={post} user={user} />
            ))}
      </ul>
      {showAllPosts && postsToShow < allPosts.length && (
        <button onClick={showMorePosts}>Load More</button>
      )}
    </div>
  );
};

export default Home;

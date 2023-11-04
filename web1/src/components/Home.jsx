import React, { useState, useEffect } from "react";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import "../styles/styles.scss";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [postsToShow, setPostsToShow] = useState(5);
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
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error fetching users: ", error);
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
      <h1>{showAllPosts ? "All Posts" : "Your Posts"}</h1>
      <button onClick={showPosts}>Toggle Posts</button>
      <ul>
        {showAllPosts
          ? allPosts.slice(0, postsToShow).map((post) => {
              const userP = users.find((u) => u.id === post.userId);
              const user = userP
                ? {
                    id: userP.id,
                    firstName: userP.firstName,
                    lastName: userP.lastName,
                  }
                : { id: "unknown", firstName: "Unknown", lastName: "User" };
              return (
                <Post
                  key={post.id}
                  post={post}
                  user={user}
                  onPostClick={handlePostClick}
                />
              );
            })
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
    </div>
  );
};

export default Home;

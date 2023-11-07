import React, { useState, useEffect } from "react";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import "../styles/styles.scss";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [postsToShow, setPostsToShow] = useState(10);
  // eslint-disable-next-line
  const [postsToLoad, setPostsToLoad] = useState(5);
  // eslint-disable-next-line
  const [selectedPost, setSelectedPost] = useState(null);

  const navigate = useNavigate();

  /*
  se cargan todos los posts y todos los usuarios */
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

  //se filtran los posts correspondientes al usuario loggeado
  const filteredPosts = allPosts.filter((post) => post.userId === user.id);

  //toggle entre posts, todos o sólo los del usuario
  const showPosts = () => {
    setShowAllPosts(!showAllPosts);
  };

  //lazy loading de todos los posts
  const showMorePosts = () => {
    setPostsToShow(postsToShow + postsToLoad);
  };

  //evento de click a un post específico
  const handlePostClick = (post) => {
    setSelectedPost(post);
    navigate(`/post/${post.id}`, { state: { post } });
  };

  return (
    <div>
      <h1>{showAllPosts ? "All Posts" : "Your Posts"}</h1>{" "}
      <button onClick={showPosts}>Toggle Posts</button>
      <ul className="grid-list">
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
                <li key={post.id}>
                  <Post
                    key={post.id}
                    post={post}
                    user={user}
                    onPostClick={handlePostClick}
                  />
                </li>
              );
            })
          : filteredPosts.map((post) => (
              <li key={post.id}>
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

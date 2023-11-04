import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Tag from "./Tag";
import "../styles/styles.scss";

const CompletePost = ({ id }) => {
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const { state } = location;
  const { post } = state;

  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [postsWithTag, setPostsWithTag] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dummyjson.com/comments?postId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
      })
      .catch((error) => {
        console.error("Error fetching comments: ", error);
      });
  }, [id]);

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

  const goBack = () => {
    navigate("/");
  };

  const openTagModal = (tag) => {
    setSelectedTag(tag);
    const relatedPosts = allPosts.filter(
      (post) => post.tags && post.tags.includes(tag)
    );
    setPostsWithTag(relatedPosts);
    setTagModalVisible(true);
  };

  const closeTagModal = () => {
    setTagModalVisible(false);
  };

  return (
    
    <div className="complete-post">
      <button className="back-button main-container" onClick={goBack}>Go Back</button>

      <div className="grid-post " >
      <h2>Post ID: {post.id}</h2>
      <h2>Title: {post.title}</h2>
      <p>Body: {post.body}</p>
      <p>Published by: {post.userId}</p>


      {/*tags y reactions*/}
      <ul className="grid-list">
        {post.tags && (
          <li>
            Tags:{" "}
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="tag-link"
                onClick={() => openTagModal(tag)}
              >
                {tag}
                {", "}
              </span>
            ))}
          </li>
        )}
        <li>Reactions: {post.reactions}</li>
      </ul>

      </div>
      

      
      <h3>Comments</h3>
      <ul className="grid-list grid-post ">
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.user.username}:</strong> {comment.body}
          </li>
        ))}
      </ul>
      
      
      {tagModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Tag
              tag={selectedTag}
              posts={postsWithTag}
              onClose={closeTagModal}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default CompletePost;

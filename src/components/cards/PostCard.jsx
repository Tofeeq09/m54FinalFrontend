// Path: src/pages/components/cards/PostCard.jsx

import PropTypes from "prop-types";
import "./PostCard.scss"

const PostCard = ({ post }) => {
  if (!post || !post.User) {
    return null;
  }

  return (
    <div className="post-card">
      <img src={post.User.avatar} alt={post.User.username} />
      <h3>{post.User.username}</h3>
      <p>{post.content}</p>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.shape({
      username: PropTypes.string,
      avatar: PropTypes.string,
    }),
    content: PropTypes.string,
  }),
};

export default PostCard;

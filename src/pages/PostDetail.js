import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/posts/${id}`);
      setPost(data);
      setIsLiked(user && data.likes?.includes(user._id));
      setError('');
    } catch (err) {
      setError('Failed to load post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await api.get(`/comments/post/${id}`);
      setComments(data);
    } catch (err) {
      console.error('Failed to load comments:', err);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const { data } = await api.post(`/posts/${id}/like`);
      setIsLiked(data.isLiked);
      setPost({ ...post, likes: Array(data.likes).fill(null) });
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    if (!newComment.trim()) return;

    try {
      const { data } = await api.post('/comments', {
        content: newComment,
        post: id
      });
      setComments([data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${id}`);
        navigate('/my-posts');
      } catch (err) {
        alert('Failed to delete post');
        console.error(err);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await api.delete(`/comments/${commentId}`);
        setComments(comments.filter(c => c._id !== commentId));
      } catch (err) {
        console.error('Failed to delete comment:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container">
        <div className="alert alert-error">{error || 'Post not found'}</div>
      </div>
    );
  }

  return (
    <div className="post-detail-page">
      <div className="container">
        <article className="post-detail card">
          {post.image && (
            <div className="post-detail-image">
              <img src={post.image} alt={post.title} />
            </div>
          )}

          <div className="post-detail-content">
            <h1>{post.title}</h1>

            <div className="post-detail-meta">
              <div className="author-info">
                <img
                  src={post.author?.avatar || 'https://via.placeholder.com/50'}
                  alt={post.author?.username}
                />
                <div>
                  <p className="author-name">{post.author?.username}</p>
                  <p className="post-detail-date">{formatDate(post.createdAt)}</p>
                </div>
              </div>

              {user && post.author?._id === user._id && (
                <div className="post-actions">
                  <Link to={`/edit/${post._id}`} className="btn btn-primary btn-sm">
                    Edit
                  </Link>
                  <button onClick={handleDeletePost} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </div>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="post-detail-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="post-detail-text">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="post-detail-stats">
              <button
                onClick={handleLike}
                className={`like-btn ${isLiked ? 'liked' : ''}`}
              >
                ❤️ {post.likes?.length || 0}
              </button>
              <span>👁️ {post.views || 0} views</span>
              <span>💬 {comments.length} comments</span>
            </div>
          </div>
        </article>

        <div className="comments-section">
          <h2>Comments ({comments.length})</h2>

          {user ? (
            <form onSubmit={handleCommentSubmit} className="comment-form card">
              <textarea
                className="form-textarea"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="3"
              />
              <button type="submit" className="btn btn-primary">
                Post Comment
              </button>
            </form>
          ) : (
            <div className="card">
              <p>
                <Link to="/login">Login</Link> to leave a comment
              </p>
            </div>
          )}

          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="comment card">
                  <div className="comment-header">
                    <div className="comment-author">
                      <img
                        src={comment.author?.avatar || 'https://via.placeholder.com/40'}
                        alt={comment.author?.username}
                      />
                      <div>
                        <p className="comment-author-name">{comment.author?.username}</p>
                        <p className="comment-date">{formatDate(comment.createdAt)}</p>
                      </div>
                    </div>
                    {user && comment.author?._id === user._id && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

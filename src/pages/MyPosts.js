import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './MyPosts.css';

const MyPosts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchMyPosts();
  }, [user]);

  const fetchMyPosts = async () => {
    try {
      const { data } = await api.get(`/posts/user/${user._id}`);
      setPosts(data);
      setError('');
    } catch (err) {
      setError('Failed to load your posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${postId}`);
        setPosts(posts.filter(post => post._id !== postId));
      } catch (err) {
        alert('Failed to delete post');
        console.error(err);
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

  return (
    <div className="my-posts-page">
      <div className="container">
        <div className="my-posts-header">
          <h1>My Posts</h1>
          <Link to="/create" className="btn btn-primary">
            Create New Post
          </Link>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {posts.length === 0 ? (
          <div className="no-posts card">
            <p>You haven't created any posts yet.</p>
            <Link to="/create" className="btn btn-primary mt-2">
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="my-posts-list">
            {posts.map((post) => (
              <div key={post._id} className="my-post-item card">
                <div className="my-post-content">
                  {post.image && (
                    <div className="my-post-image">
                      <img src={post.image} alt={post.title} />
                    </div>
                  )}
                  <div className="my-post-info">
                    <h2>
                      <Link to={`/posts/${post._id}`}>{post.title}</Link>
                    </h2>
                    <p className="my-post-excerpt">
                      {post.excerpt || post.content.substring(0, 100) + '...'}
                    </p>
                    <div className="my-post-meta">
                      <span className="post-date">{formatDate(post.createdAt)}</span>
                      <div className="post-stats">
                        <span>❤️ {post.likes?.length || 0}</span>
                        <span>👁️ {post.views || 0}</span>
                      </div>
                      <span className={`post-status ${post.published ? 'published' : 'draft'}`}>
                        {post.published ? '✓ Published' : '📝 Draft'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="my-post-actions">
                  <Link to={`/edit/${post._id}`} className="btn btn-primary btn-sm">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(post._id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;

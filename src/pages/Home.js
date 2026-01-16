import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [page, search]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/posts?page=${page}&limit=6&search=${search}`);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setError('');
    } catch (err) {
      setError('Failed to load posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="container">
        <div className="home-header">
          <h1>Welcome to Momo Blog</h1>
          <p>Discover amazing stories and share your own</p>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            className="form-input"
            placeholder="Search posts..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="posts-grid">
          {posts.length === 0 ? (
            <div className="no-posts">
              <p>No posts found. Be the first to create one!</p>
              <Link to="/create" className="btn btn-primary mt-2">
                Create Post
              </Link>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="post-card card">
                {post.image && (
                  <div className="post-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                )}
                <div className="post-content">
                  <div className="post-header">
                    <h2>
                      <Link to={`/posts/${post._id}`}>{post.title}</Link>
                    </h2>
                  </div>
                  <p className="post-excerpt">
                    {post.excerpt || post.content.substring(0, 150) + '...'}
                  </p>
                  <div className="post-meta">
                    <div className="post-author">
                      <img
                        src={post.author?.avatar || 'https://via.placeholder.com/40'}
                        alt={post.author?.username}
                      />
                      <span>{post.author?.username}</span>
                    </div>
                    <span className="post-date">{formatDate(post.createdAt)}</span>
                  </div>
                  <div className="post-stats">
                    <span>❤️ {post.likes?.length || 0}</span>
                    <span>👁️ {post.views || 0}</span>
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="post-tags">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="btn btn-outline"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="page-info">
              Page {page} of {totalPages}
            </span>
            <button
              className="btn btn-outline"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

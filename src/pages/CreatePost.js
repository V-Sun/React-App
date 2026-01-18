import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './CreatePost.css';

const CreatePost = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    image: '',
    published: true
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(isEdit);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isEdit) {
      fetchPost();
    }
  }, [id, user]);

  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/posts/${id}`);

      if (data.author._id !== user._id) {
        navigate('/');
        return;
      }

      setFormData({
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || '',
        tags: data.tags?.join(', ') || '',
        image: data.image || '',
        published: data.published
      });
    } catch (err) {
      setError('Failed to load post');
      console.error(err);
    } finally {
      setLoadingPost(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (isEdit) {
        await api.put(`/posts/${id}`, postData);
      } else {
        await api.post('/posts', postData);
      }

      navigate('/my-posts');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loadingPost) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="create-post-page">
      <div className="container">
        <div className="create-post-container">
          <h1>{isEdit ? 'Edit Post' : 'Create New Post'}</h1>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="create-post-form">
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                required
                maxLength="200"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Content *</label>
              <textarea
                name="content"
                className="form-textarea"
                value={formData.content}
                onChange={handleChange}
                required
                rows="15"
                placeholder="Write your post content here..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Excerpt</label>
              <textarea
                name="excerpt"
                className="form-textarea"
                value={formData.excerpt}
                onChange={handleChange}
                maxLength="500"
                rows="3"
                placeholder="Brief summary of your post (optional)"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input
                type="url"
                name="image"
                className="form-input"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tags</label>
              <input
                type="text"
                name="tags"
                className="form-input"
                value={formData.tags}
                onChange={handleChange}
                placeholder="technology, react, javascript (comma separated)"
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                />
                <span>Publish immediately</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate('/my-posts')}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from '../api';
import { useParams } from 'react-router-dom';

const EditPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the post data when the component mounts
        const fetchPost = async () => {
            try {
            const response = await apiClient.get(`posts/${postId}`);
                setPost(response.data);
            } catch (err) {
                setError('Failed to fetch post data.');
            }
        };

        fetchPost();
    }, [postId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await apiClient.put(`posts/${postId}`, post);
            setLoading(false);
            // if (onPostUpdated) onPostUpdated();
        } catch (err) {
            setLoading(false);
            setError('Failed to update the post.');
        }
    };

    return (
        <div>
            <h2>Edit Post</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                  <input type="hidden" name="id" value={post.id} />
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="detail">Content:</label>
                    <textarea
                        id="detail"
                        name="detail"
                        value={post.detail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default EditPost;
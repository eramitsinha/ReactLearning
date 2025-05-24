import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from "../api";


const ViewPost = () => {
    
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await apiClient.get(`posts/${postId}/`);
                setPost(response.data);
            } catch (err) {
                setError('Failed to fetch the post.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>{post.title} - Posted by {post.user.name}</h1>
            <p>{post.detail}</p>
        </div>
    );
};

export default ViewPost;
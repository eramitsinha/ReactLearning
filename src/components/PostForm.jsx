import { useState } from 'react';
import apiClient from "../api";
import { Navigate, useNavigate } from 'react-router-dom';

const PostForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        detail: '',
        image: null,
    });
    const [message, setMessage] = useState("");
    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
             setFormData({ ...formData, image: files[0] });
        } else {
             setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        const postData = new FormData();
        postData.append("title", formData.title);
        postData.append("detail", formData.detail);
        postData.append("image", formData.image);
        try{
            const response = await apiClient.post('/posts', postData, {
             headers: { "Content-Type": "multipart/form-data" },
             });
             setMessage("Post created successfully!");
             setFormData({ title: '', detail: '' });
             Navigate('/posts'); 
        } catch (error) {
            setMessage("Error creating post.");
        }
    };

    return (
        <div className='form-control'>
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="hidden" name="user_id" value={localStorage.getItem("user_id")} />
            <div className='form-control'>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="detail">Content:</label>
                <textarea className='form-control'
                    id="detail"
                    name="detail"
                    value={formData.detail}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                />      
            </div>
            
            <button type="su</div>bmit" className='form-control'>Save Post</button>
        </form>
        {message && <p>{message}</p>}
        </div>
    );
};

export default PostForm;
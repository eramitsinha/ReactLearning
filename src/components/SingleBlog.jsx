import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from "../api";


const SingleBlog = () => {
    
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
            <div id="main">
							<article className="post">
								<header>
									<div className="title">
										<h2><a href="single.html">{post.title}</a></h2>
									</div>
									<div className="meta">
                                        <time className="published" dateTime={post.created_at}>
                                            {new Date(post.created_at).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}
                                        </time>
										{/* <time className="published" datetime="2015-11-01">November 1, 2015</time> */}
										<a href="#" className="author"><span className="name">{post.user.name}</span><img src="images/avatar.jpg" alt="" /></a>
									</div>
								</header>
								<a href="" className="image featured">
                                        <img src={`http://localhost:8000/storage/${post.image}`} alt="" />
                                </a>
                                <p>{post.detail.slice(0, 100)} ... </p>
								<footer>
									<ul className="actions">
										<li><a href="single.html" className="button large">Continue Reading</a></li>
									</ul>
									<ul className="stats">
										<li><a href="#">General</a></li>
										<li><a href="#" className="icon solid fa-heart">28</a></li>
										<li><a href="#" className="icon solid fa-comment">128</a></li>
									</ul>
								</footer>
							</article>

                    </div>
        </div>
    );
};

export default SingleBlog;
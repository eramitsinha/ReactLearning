import { useEffect, useState } from "react";
import apiClient from "../../api";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { IMAGE_BASE_URL } from "../../api";

const ImportantBlogs = () => {  
    const [posts, setPosts] = useState([]);
     const { page } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPostsByPage = async (page) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get(`posts/?page=${page}`);
            setPosts(response.data);
             console.log(response.data);
        } catch (err) {
            setError("Error fetching posts");
        } finally {
            setLoading(false);
        }
    };

      useEffect(() => {
        const fetchPosts = async () => {
            try {
                
                const response = await apiClient.get(`posts/?page={page}`);
                setPosts(response.data);
               
            } catch (err) {
                setError("Error fetching posts");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div id="main">
            {posts.data.map((post) => (
                <article className="post" key={post.id}>
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
                            <a href="#" className="author">
                                <span className="name">{post.user.name}</span><img src="images/avatar.jpg" alt="" /></a>
                        </div>
                    </header>
                    <a href="single.html" className="image featured"></a>
                                <a href="single.html" className="image featured">
                                     <img src={`${IMAGE_BASE_URL}/${post.image}`} alt="" />
                                </a>
                                <p>{post.detail.slice(0, 100)} ... </p>
								<footer>
									<ul className="actions">
                                        <Link to={`/single-blog/${post.id}`} className="button large">View</Link>
									</ul>
									<ul className="stats">
										<li><a href="#">General</a></li>
										<li><a href="#" className="icon solid fa-heart">28</a></li>
										<li><a href="#" className="icon solid fa-comment">128</a></li>
									</ul>
								</footer>
							</article>
                        ))}


                        <ul className="actions pagination">
                            
                            <li>
                                
                            <a
                                href="#"
                                className={`button large previous${posts.current_page === 1 ? " disabled" : ""}`}
                                onClick={e => {
                                    e.preventDefault();
                                    if (posts.current_page > 1) {
                                        fetchPostsByPage(posts.current_page - 1);
                                    }
                                }}
                            >
                                Previous Page
                            </a>

                            <a
                                href="#"
                                className={`button large next${posts.current_page === posts.last_page ? " disabled" : ""}`}
                                onClick={e => {
                                    e.preventDefault();
                                    if (posts.current_page < posts.last_page) {
                                        fetchPostsByPage(posts.current_page + 1);
                                    }
                                }}
                            >
                                Next Page
                            </a>
                              
                            </li>
                        </ul>
                           
                    </div>
    );
    }   

    export default ImportantBlogs;  
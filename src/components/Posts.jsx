import { useEffect, useState } from "react";
import apiClient from "../api";

const Posts = () => {   
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await apiClient.get("posts/");
                setPosts(response.data.data);
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
        <div>
            <div class="h-screen flex-grow-1 overflow-y-lg-auto">
             <div class="card shadow border-0 mb-7">
                    <div class="card-header">
                        <h5 class="mb-0">Latest Posts</h5>
                    </div>

            <table class="table table-hover table-nowrap">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">User Id</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.user.name}</td>
                                        <td>{post.title}</td>
                                        <td>{new Date(post.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <a href="#" class="btn btn-sm btn-neutral">View</a>
                                        </td>
                                    </tr>
                                ))}

                                </tbody>
                                </table>
                                </div>
                                </div>
           
        </div>
    );
}

export default Posts
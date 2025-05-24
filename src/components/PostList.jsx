import { useEffect, useState } from "react";
import apiClient from "../api";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

const PostList = () => {    
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

    //define data table columns
    
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "User ID",
            selector: (row) => row.user.name,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Date",
            selector: (row) => new Date(row.created_at).toLocaleDateString(),
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div>
                    <Link to={`/dashboard/post/${row.id}`} className="btn btn-sm btn-neutral">View</Link>
                    <Link to={`/dashboard/post/edit/${row.id}`} className="btn btn-sm btn-neutral">Edit</Link>
                    <button onClick={() => deletePost(row.id)} className="btn btn-sm btn-neutral">Delete</button>  
                </div>
            ),
        },
    ];

    const deletePost = async (postId) => {
        try {   
            //const confirmDelete = window.confirm("Are you sure you want to delete this post?"); 
            await apiClient.delete(`posts/${postId}/`);
            setPosts(posts.filter(post => post.id !== postId));
        }catch (err) {
            setError("Error deleting post");    
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div width="100%"> 
            <div className="h-screen flex-grow-1 overflow-y-lg-auto">
                <div className="card shadow border-0 mb-0">
                    <div className="card-header">
                        <h5 className="mb-0">Posts</h5>
                        <Link to="/dashboard/post/create" className="btn btn-sm btn-neutral">Create Post</Link>
                    </div>
                     <DataTable
                        columns={columns}
                        data={posts}
                        progressPending={loading}
                        paginationPerPage={3}
                        pagination
                        highlightOnHover
                        striped
                        responsive
                        searchable = {true}

                    />
                    {/* <table className="table table-hover table-nowrap">
                        <thead className="thead-light">
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
                                        <Link to={`/dashboard/post/${post.id}`} className="btn btn-sm btn-neutral">View</Link>
                                        <Link to={`/dashboard/post/edit/${post.id}`} className="btn btn-sm btn-neutral">Edit</Link>
                                        <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-neutral">Delete</button>  
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                </div>
            </div>           
        </div>
    );
}

export default PostList;

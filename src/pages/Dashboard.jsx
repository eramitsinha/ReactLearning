import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { useUser } from "../components/UserContext";
import Navigation from "../components/Navigation";
import "../style.css"; // Import the CSS file for styling
import Posts from "../components/Posts"; 
import PostList from "../components/PostList";
import Category from "../components/Category";
import ViewPost from "../components/ViewPost";
import PostForm from "../components/PostForm"; // Import the PostForm component
import EditPost from "../components/EditPost";

const Dashboard = () => {
    // const location = useLocation(); 
    // const state = location.state || {}; // Get the state passed from the login page 
    // const name = state.name || "User"; // Get the name from the state or use a default value
    const { user } = useUser(); // Get the user data from the context
    //const user = JSON.parse(localStorage.getItem("user")); // Get the user data from local storage


    return (
        <>  
            
            <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
                <Navigation /> {/* Include the Navigation component */}
                 <Routes>
                     <Route index element={<Posts />} />                    
                     <Route path="post" element={<PostList />} />
                     <Route path="category" element={<Category />} />
                     <Route path="post/:postId" element={<ViewPost />} />
                    <Route path="post/create" element={<PostForm />} />
                    {/* <Route path="post/edit/:id" element={<EditPost />} /> */}
                    <Route path="post/edit/:postId" element={<EditPost />} />
                </Routes>
                    <Outlet />
            </div>
        </>
    );
}

export default Dashboard;
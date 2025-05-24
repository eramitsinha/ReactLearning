import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { useUser } from "../components/UserContext";
import Navigation from "../components/front_end/Navigation";
import "../assets/css/main.css"; // Import the CSS file for styling
import ImportantBlogs from "../components/front_end/ImportantBlogs"; // Import the ImportantBlogs component
import SingleBlog from "../components/SingleBlog";



const Home = () => {

    const { user } = useUser(); // Get the user data from the context


    return (
        <>  
            
            <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
                <Navigation /> {/* Include the Navigation component */}

                <Outlet />
            </div>
        </>
    );
}

export default Home;
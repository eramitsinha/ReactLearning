import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import './login.css'
import Dashboard from './pages/Dashboard'
import { UserProvider } from './components/UserContext'
import Posts from './components/Posts'
import Category from './components/Category'
import PostList from './components/PostList'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import ImportantBlogs from './components/front_end/ImportantBlogs'
import SingleBlog from './components/SingleBlog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserProvider>
        <BrowserRouter> 
          <Routes>
            {/* public  */}
            <Route path="/" element={<Home />}>
              <Route index element={<ImportantBlogs />} />
              <Route path="single-blog/:postId" element={<SingleBlog />} />
              <Route path="login" element={<Login />} />  
              <Route path='posts/*' element={<ImportantBlogs />} />
            </Route>

            {/* dashboard */}
            <Route path="/dashboard/*" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }             
            />

            <Route path="post" 
              element={
                <ProtectedRoute>
                  <PostList />
                </ProtectedRoute>
              }
              
              
              />
            <Route path="category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
  
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App

// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import AddBlog from './pages/AddBlog';
import Contact from './pages/Contact'; 

function App() {
    const [blogs, setBlogs] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState('');

    const addBlog = (newBlog) => {
        setBlogs([...blogs, newBlog]);
        showMessage("Blog added successfully!", "green");
    };

    const deleteBlog = (index) => {
        setBlogs(blogs.filter((_, i) => i !== index));
        showMessage("Blog deleted successfully!", "red");
    };

    const editBlog = (index, updatedBlog) => {
        const updatedBlogs = [...blogs];
        updatedBlogs[index] = updatedBlog;
        setBlogs(updatedBlogs);
        showMessage("Blog edited successfully!", "green");
    };

    const showMessage = (message, color) => {
        setSuccessMessage(message);
        setMessageStyle(color);
        setTimeout(() => setSuccessMessage(''), 3000); 
    };

    return (
        <Router>
            <Navbar />
            <div className="p-4">
                {successMessage && (
                    <div
                        className={`fixed top-4 right-4 p-2 mb-4 rounded text-white ${messageStyle === 'green' ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                        {successMessage}
                    </div>
                )}
                <Routes>
                    <Route path="/" element={<Homepage blogs={blogs} deleteBlog={deleteBlog} editBlog={editBlog} />} />
                    <Route path="/add-blog" element={<AddBlog addBlog={addBlog} />} />
                    <Route path="/contact" element={<Contact />} />  
                </Routes>
            </div>
        </Router>
    );
}

export default App;

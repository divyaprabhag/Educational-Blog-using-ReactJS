// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4 text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">EduBlog</h1>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-gray-200">Home</Link>
                    <Link to="/add-blog" className="hover:text-gray-200">Add Blog</Link>
                    <Link to="/contact" className="hover:text-gray-200">Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

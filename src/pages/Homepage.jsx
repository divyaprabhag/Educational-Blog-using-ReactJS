// Homepage.jsx
import React, { useState } from 'react';

const Homepage = ({ blogs, deleteBlog, editBlog }) => {
    const [editingIndex, setEditingIndex] = useState(null);
    const [editData, setEditData] = useState({ title: '', description: '', image: '', category: '' });
    const [expandedIndex, setExpandedIndex] = useState(null); // New state to track which blog is expanded

    const handleEditClick = (index, blog) => {
        setEditingIndex(index);
        setEditData(blog); // Load the blog data into edit form
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editBlog(editingIndex, editData);
        setEditingIndex(null); // Close the edit mode
    };

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Toggle expand/collapse
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Educational Blogs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogs.map((blog, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-lg relative">
                        {blog.image && (
                            <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover mb-2 rounded" />
                        )}
                        <h2 className="text-xl font-semibold">{blog.title}</h2>
                        <p className="text-sm text-gray-500">{blog.category}</p>
                        <p className="text-gray-700">
                            {expandedIndex === index ? blog.description : `${blog.description.slice(0, 100)}...`}
                        </p>

                        <button
                            onClick={() => toggleExpand(index)}
                            className="text-blue-500 hover:text-blue-700 mt-2"
                        >
                            {expandedIndex === index ? 'Read Less' : 'Read More'}
                        </button>

                        <div className="flex justify-end space-x-2 mt-4">
                            <button onClick={() => handleEditClick(index, blog)} className="text-blue-500 hover:text-blue-700">
                                ✏️
                            </button>
                            <button onClick={() => deleteBlog(index)} className="text-red-500 hover:text-red-700">
                                🗑️
                            </button>
                        </div>
                        
                        {editingIndex === index && (
                            <form onSubmit={handleEditSubmit} className="mt-4 space-y-2 p-2 border rounded">
                                <input
                                    type="text"
                                    value={editData.title}
                                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                    placeholder="Edit title"
                                    className="w-full p-2 border rounded"
                                />
                                <textarea
                                    value={editData.description}
                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                    placeholder="Edit description"
                                    className="w-full p-2 border rounded"
                                />
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Save Changes
                                </button>
                            </form>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;

import React, { useState } from 'react';

const categories = [
    'Mathematics', 'Science', 'Engineering','History', 'Geography', 'Literature',
    'Art', 'Technology', 'Psychology', 'Philosophy', 'Languages',
];

const AddBlog = ({ addBlog }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState(categories[0]);
    const [errorMessage, setErrorMessage] = useState('');
    const [fileError, setFileError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Create a temporary URL for the uploaded image
            setErrorMessage(''); // Clear error message when a valid image is selected
            setFileError(''); // Clear file error
        } else {
            setFileError('Please select a file.'); // Set file error if no file is selected
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!image) {
            setFileError('Please add an image before submitting the blog.');
            return; // Prevent submission if no image is provided
        }
        addBlog({ title, description, image, category });
        setTitle('');
        setDescription('');
        setImage(null);
        setCategory(categories[0]);
        setErrorMessage(''); // Clear error message after submission
        setFileError(''); // Clear file error after submission
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Add a New Blog</h2>
            {errorMessage && (
                <div className="mb-4 p-2 text-red-700 bg-red-100 rounded">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Upload Image:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded bg-white" // Keep it white
                        accept="image/*"
                        required
                    />
                    {fileError && <div className="text-red-600">{fileError}</div>}
                    {image && <img src={image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />}
                </div>
                <div>
                    <label className="block font-semibold">Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        {categories.slice(0, 8).map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Add Blog
                </button>
            </form>
        </div>
    );
};

export default AddBlog;

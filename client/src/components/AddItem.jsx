import React, { useState } from 'react';
import { createProduct } from '../index.js';

const AddItem = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        image: null,
        description:'',
        category: '',
        price: '',
        tags: []
    });
    const [tagInput, setTagInput] = useState('');

    const categories = ['Men', 'Women', 'Kids', 'Accessories'];
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
     // Handle form input change
     const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleAddTag = () => {
        if (tagInput && !formData.tags.includes(tagInput)) {
            setFormData({ ...formData, tags: [...formData.tags, tagInput] });
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag) => {
        setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
    };

    // Submit form for adding or updating product
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        const form = new FormData();
        form.append('name', formData.itemName);
        form.append('description', formData.description);
        form.append('price', formData.price);
        form.append('category', formData.category);
        form.append('tags', formData.tags); // Split tags into an array
        if (formData.image) {
            form.append('image', formData.image); // Only append image if present
        }
        try{
            const newproduct=  await createProduct(form);
            console.log(newproduct)
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-white p-8  w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Add New Item</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Item Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Item Name</label>
                    <input
                        type="text"
                        name="itemName"
                        value={formData.itemName}
                        onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                        className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                        placeholder="Enter item name"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Category Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map((category, idx) => (
                            <option key={idx} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tags Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tags</label>
                    <div className="flex items-center space-x-2 mt-1">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            className="p-2 border border-gray-300 rounded-lg flex-1"
                            placeholder="Enter a tag"
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md"
                        >
                            Add Tag
                        </button>
                    </div>
                    <div className="flex flex-wrap mt-2">
                        {formData.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="bg-gray-100 px-4 py-2 rounded-full mr-2 mt-2 inline-flex items-center"
                            >
                                {tag}
                                <button
                                    type="button"
                                    className="ml-2 text-red-500"
                                    onClick={() => handleRemoveTag(tag)}
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full hover:bg-gray-800 text-white py-2 px-4 rounded-lg bg-black transition"
                >
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default AddItem;

import React, { useState } from 'react';
import { createProduct } from '../index.js';
import { useSelector } from 'react-redux';

const AddItem = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        images: [], // Handle multiple images
        description: '',
        category: '',
        subCategory: '',
        price: '',
        tags: [],
        sizes: [] // Field for sizes
    });
    const [tagInput, setTagInput] = useState('');
    const [sizeInput, setSizeInput] = useState(''); // State for size input
    const { categories, subcategories } = useSelector((state) => state.product);

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
        const files = Array.from(e.target.files);
        if (files.length + formData.images.length > 4) {
            alert('You can only upload up to 4 images.');
            return;
        }
        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...files],
        }));
    };

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleSizeInputChange = (e) => {
        setSizeInput(e.target.value);
    };

    const handleAddTag = () => {
        if (tagInput && !formData.tags.includes(tagInput)) {
            setFormData((prevData) => ({
                ...prevData,
                tags: [...prevData.tags, tagInput],
            }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag) => {
        setFormData((prevData) => ({
            ...prevData,
            tags: prevData.tags.filter((t) => t !== tag),
        }));
    };

    const handleAddSize = () => {
        if (sizeInput && !formData.sizes.includes(sizeInput)) {
            setFormData((prevData) => ({
                ...prevData,
                sizes: [...prevData.sizes, sizeInput],
            }));
            setSizeInput('');
        }
    };

    const handleRemoveSize = (size) => {
        setFormData((prevData) => ({
            ...prevData,
            sizes: prevData.sizes.filter((s) => s !== size),
        }));
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
        form.append('subCategory', formData.subCategory);
        form.append('tags', JSON.stringify(formData.tags)); // Convert tags array to JSON string
        form.append('sizes', JSON.stringify(formData.sizes)); // Convert sizes array to JSON string
        formData.images.forEach((image) => {
            form.append('images', image); // Append multiple images
        });

        try {
            const newProduct = await createProduct(form);
            console.log(newProduct);
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Add New Item</h1>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Item Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Item Name</label>
                    <input
                        type="text"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                        placeholder="Enter item name"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Images</label>
                    <div className="mt-1 flex flex-wrap gap-2">
                        {formData.images.map((image, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index}`}
                                className="w-24 h-24 object-cover border border-gray-300 rounded-lg"
                            />
                        ))}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="mt-4 p-2 border border-gray-300 rounded-lg w-full"
                    />
                    
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                {/* Category Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
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

                {/* SubCategory Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">SubCategory</label>
                    <select
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                        required
                    >
                        <option value="" disabled>Select a SubCategory</option>
                        {subcategories.map((subCategory, idx) => (
                            <option key={idx} value={subCategory}>
                                {subCategory}
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

                {/* Sizes Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Sizes</label>
                    <div className="flex items-center space-x-2 mt-1">
                        <input
                            type="text"
                            value={sizeInput}
                            onChange={handleSizeInputChange}
                            className="p-2 border border-gray-300 rounded-lg flex-1"
                            placeholder="Enter a size"
                        />
                        <button
                            type="button"
                            onClick={handleAddSize}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md"
                        >
                            Add Size
                        </button>
                    </div>
                    <div className="flex flex-wrap mt-2">
                        {formData.sizes.map((size, idx) => (
                            <span
                                key={idx}
                                className="bg-gray-100 px-4 py-2 rounded-full mr-2 mt-2 inline-flex items-center"
                            >
                                {size}
                                <button
                                    type="button"
                                    className="ml-2 text-red-500"
                                    onClick={() => handleRemoveSize(size)}
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className={`px-4 py-2 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-gray-800'}`}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>

                {/* Success or Error Message */}
                {success && <div className="text-green-500">Item added successfully!</div>}
                {error && <div className="text-red-500">{error}</div>}
            </form>
        </div>
    );
};

export default AddItem;

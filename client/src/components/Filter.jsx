import React, { useState } from 'react';

const Filter = ({ categories, subcategories, sizes, onFilterChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setSelectedCategory(value);
        onFilterChange({ category: value, subcategory: selectedSubcategory, priceRange, size: selectedSize });
    };

    const handleSubcategoryChange = (event) => {
        const value = event.target.value;
        setSelectedSubcategory(value);
        onFilterChange({ category: selectedCategory, subcategory: value, priceRange, size: selectedSize });
    };

    const handlePriceRangeChange = (event) => {
        const value = event.target.value;
        setPriceRange(value);
        onFilterChange({ category: selectedCategory, subcategory: selectedSubcategory, priceRange: value, size: selectedSize });
    };

    const handleSizeChange = (event) => {
        const value = event.target.value;
        setSelectedSize(value);
        onFilterChange({ category: selectedCategory, subcategory: selectedSubcategory, priceRange, size: value });
    };

    return (
        <div className="filter-container p-4 border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category:</label>
                <select 
                    id="category" 
                    value={selectedCategory} 
                    onChange={handleCategoryChange} 
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="subcategory" className="block text-gray-700 font-medium mb-2">Subcategory:</label>
                <select 
                    id="subcategory" 
                    value={selectedSubcategory} 
                    onChange={handleSubcategoryChange} 
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                >
                    <option value="">All Subcategories</option>
                    {subcategories.map((subcategory, index) => (
                        <option key={index} value={subcategory}>{subcategory}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="priceRange" className="block text-gray-700 font-medium mb-2">Price Range:</label>
                <select 
                    id="priceRange" 
                    value={priceRange} 
                    onChange={handlePriceRangeChange} 
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                >
                    <option value="">All Prices</option>
                    <option value="0-50">$0 - $50</option>
                    <option value="51-100">$51 - $100</option>
                    <option value="101-200">$101 - $200</option>
                    <option value="201-500">$201 - $500</option>
                    <option value="500+">$500+</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="size" className="block text-gray-700 font-medium mb-2">Size:</label>
                <select 
                    id="size" 
                    value={selectedSize} 
                    onChange={handleSizeChange} 
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                >
                    <option value="">All Sizes</option>
                    {sizes.map((size, index) => (
                        <option key={index} value={size}>{size}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Filter;

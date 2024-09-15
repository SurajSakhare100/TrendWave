import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from '../../utils/debounce';
import { fetchProducts, setFilters } from '../app/features/productSlice';

const Filter = () => {
    const {filters,products, categories, subcategories, sizes, loading, error}=useSelector((state) => state.product);
    const dispatch = useDispatch();

   
    const onFilterChange = (newFilters) => {
        // dispatch(setFilters(newFilters));
    };

    // useEffect(() => {
    //     fetchFilteredProducts();
    // }, [filters, ]);

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        onFilterChange({ ...filters, category: value });
    };

    const handleSubcategoryChange = (event) => {
        const value = event.target.value;
        onFilterChange({ ...filters, subcategory: value });
    };

    const handlePriceRangeChange = (event) => {
        const value = event.target.value;
        onFilterChange({ ...filters, priceRange: value });
    };

    const handleSizeChange = (event) => {
        const value = event.target.value;
        onFilterChange({ ...filters, size: value });
    };

    return (
        <div className="filter-container p-4 border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            <div className='grid grid-cols-2 gap-6'>
            <div className="">
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category:</label>
                <select
                    id="category"
                    value={filters.category}
                    onChange={handleCategoryChange}
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                >
                    <option value="">All Categories</option>
                    {categories?.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="">
                <label htmlFor="subcategory" className="block text-gray-700 font-medium mb-2">Subcategory:</label>
                <select
                    id="subcategory"
                    value={filters.subcategory}
                    onChange={handleSubcategoryChange}
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                >
                    <option value="">All Subcategories</option>
                    {subcategories?.map((subcategory, index) => (
                        <option key={index} value={subcategory}>{subcategory}</option>
                    ))}
                </select>
            </div>

            <div className="">
                <label htmlFor="priceRange" className="block text-gray-700 font-medium mb-2">Price Range:</label>
                <select
                    id="priceRange"
                    value={filters.priceRange}
                    onChange={handlePriceRangeChange}
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                >
                    <option value="">All Prices</option>
                    <option value="0-50">0 - 50 Rs</option>
                    <option value="51-100">51 - 100 Rs</option>
                    <option value="101-200">101 - 200 Rs</option>
                    <option value="201-500">201 - 500 Rs</option>
                    <option value="500-2000">500+ Rs</option>
                </select>
            </div>

            <div className="">
                <label htmlFor="size" className="block text-gray-700 font-medium mb-2">Size:</label>
                <select
                    id="size"
                    value={filters.size}
                    onChange={handleSizeChange}
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                >
                    <option value="">All Sizes</option>
                    {sizes?.map((size, index) => (
                        <option key={index} value={size}>{size}</option>
                    ))}
                </select>
            </div>
            </div>
        </div>
    );
};

export default Filter;

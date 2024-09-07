import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
const url="http://localhost:5000"
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [filters, setFilters] = useState({ category: '', subcategory: '', priceRange: '', size: '' });

    useEffect(() => {
        // Fetch products and filters data
        const fetchData = async () => {
            try {
                const productsResponse = await axios.get(url+'/api/products');
                setProducts(productsResponse.data);

                const filtersResponse = await axios.get(url+'/api/products/filters');
                console.log(filtersResponse)
                setCategories(filtersResponse.data.categories);
                setSubcategories(filtersResponse.data.subcategories);
                setSizes(filtersResponse.data.sizes);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Fetch products based on filters
        const fetchFilteredProducts = async () => {
            try {
                const response = await axios.get(url+'/api/products', { params: filters });
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching filtered products:', err);
            }
        };

        fetchFilteredProducts();
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/4 mb-4">
                    <Filter 
                        categories={categories} 
                        subcategories={subcategories} 
                        sizes={sizes} 
                        onFilterChange={handleFilterChange}
                    />
                </div>
                <div className="w-full md:w-3/4">
                    {/* Render filtered products here */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products?.map(product => (
                            <div key={product.id} className="border border-gray-300 p-4 rounded-lg">
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                <p className="text-gray-700 mb-2">${product.price.toFixed(2)}</p>
                                <p className="text-gray-500">{product.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;

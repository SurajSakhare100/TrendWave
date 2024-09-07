import React from 'react';
import ProductList from '../components/ProductList';


const Products = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Products</h1>
            <ProductList  />
        </div>
    );
};

export default Products;

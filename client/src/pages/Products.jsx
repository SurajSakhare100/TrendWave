import React from 'react';
import ProductList from '../components/ProductList';
import { products } from '../data';


const Products = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Products</h1>
            <ProductList products={products} />
        </div>
    );
};

export default Products;

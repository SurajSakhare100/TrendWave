import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../app/features/productSlice';
import Filter from './../components/Filter';
import Pagination from './../components/Pagination';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { products, totalProducts, pageSize, filters, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProducts({ filters, page: currentPage }));
    }, [dispatch, filters, currentPage]);

    const handlePageChange = (page) => setCurrentPage(page);

    const renderLoading = () => (
        <div className="text-center text-xl font-semibold text-blue-600">Loading...</div>
    );

    const renderError = () => (
        <div className="text-center text-xl font-semibold text-red-600">Error: {error}</div>
    );

    const renderNoData = () => (
        <h1 className="text-2xl text-center font-semibold mt-6">No data available</h1>
    );

    const renderProducts = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-20 mx-auto">
            {products.map(({ _id, image, name, price }) => (
                <div
                    key={_id}
                    className="hover:scale-105 hover:shadow-lg shadow-md transition-transform duration-300"
                >
                    <Link to={`/products/${_id}`}>
                        <img
                            src={image || '/default-image.jpg'}
                            alt={name || 'Product Image'}
                            className="w-full h-80 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-1 truncate">{name || 'Unnamed Product'}</h2>
                            <p className="text-gray-700 font-medium">
                                {price !== undefined ? `${price.toFixed(2)} RS` : 'Price Unavailable'}
                            </p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );

    return (
        <div className="container w-full px-20 mx-auto py-6 mt-20">
            {/* Filter Component */}
            <Filter />

            {/* Products Display */}
            {loading ? renderLoading() : error ? renderError() : products?.length === 0 ? renderNoData() : renderProducts()}

            {/* Pagination Component */}
            <div className="mt-8">
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalProducts / pageSize)}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default ProductList;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../app/features/productSlice';
import Filter from './Filter';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const ProductList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { products, totalProducts, pageSize, filters, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProducts({ filters, page: currentPage }));
    }, [dispatch, filters, currentPage]);

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col">
                <div className="mb-6">
                    <Filter />
                </div>

                {loading ? (
                    <div className="text-center text-xl font-semibold text-blue-600">Loading...</div>
                ) : error ? (
                    <div className="text-center text-xl font-semibold text-red-600">Error: {error}</div>
                ) : (
                    <div>
                        {products?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <div
                                        key={product._id}
                                        className="hover:scale-105 hover:shadow-lg p-4 rounded-lg transition-transform duration-300"
                                    >
                                        <Link to={`/products/${product._id}`}>
                                            <img
                                                src={product.image || '/default-image.jpg'}
                                                alt={product.name}
                                                className="w-full h-80 object-cover mb-4 rounded"
                                            />
                                            <h2 className="text-xl font-semibold mb-1 truncate">{product.name}</h2>
                                            <p className="text-gray-700 font-medium">{product.price ? `${product.price.toFixed(2)} RS` : 'Price Unavailable'}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h1 className="text-2xl text-center font-semibold mt-6">No data available</h1>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(totalProducts / pageSize)}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductList;

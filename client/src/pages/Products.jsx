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
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto py-10">
            {products.map(({ _id, image, name, price }) => (
                <div
                    key={_id}
                    className="hover:scale-105 hover:shadow-lg  transition-transform duration-300"
                >
                    <Link to={`/products/${_id}`}>
                        <img
                            src={image || '/default-image.jpg'}
                            alt={name || 'Product Image'}
                            className="w-full h-48 xs:h-64 sm:h-80 object-center"
                        />
                        <div className="p-1 xs:p-2 md:p-4">
                            <h2 className="text-lg md:text-xl text-black dark:text-white font-semibold mb-1 truncate">{name || 'Unnamed Product'}</h2>
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
        <div className=" w-full  px-10  sm:px-20 md:px-40 mx-auto py-6 pt-28  bg-white">
            <Filter />

            {loading ? renderLoading() : error ? renderError() : products?.length === 0 ? renderNoData() : renderProducts()}

            <div className="mt-8">
                <Pagination
                    currentPage={currentPage}
                    totalPages={pageSize}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default ProductList;

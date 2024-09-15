import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setFilters } from '../app/features/productSlice';
import Filter from './Filter';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const ProductList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { products, categories, subcategories, page, pageSize, sizes, filters, loading, error } = useSelector((state) => state.product);
    useEffect(() => {
        dispatch(fetchProducts({ filters, page: currentPage }));
    }, [ dispatch, currentPage]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div className="container mx-auto ">
            <div className="flex flex-col flex-wrap">
                <div className="w-full mb-4">
                    <Filter />
                </div>
                <div className="w-full mt-8">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <div className="w-full">
                            {products?.length > 0 ?
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-between'>
                                    {products?.map((product) => (
                                        <div key={product._id} className="hover:scale-105 hover:shadow-lg p-4 cursor-pointer rounded-lg">
                                            <Link to={`/products/${product?._id}`}>
                                                <img src={product?.image} alt={product.name} className="w-[300px] object-cover mb-4" />
                                                <h2 className="text-xl font-semibold mb-2">{product?.name}</h2>
                                                <p className="text-gray-700 mb-2">{product?.price.toFixed(2)} RS</p></Link>
                                        </div>
                                    ))
                                    }
                                </div> : <h1 className='w-full text-2xl text-center'>
                                    No data Available
                                </h1>}

                        </div>
                    )}
                </div>
                <div className='w-full'>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={pageSize} // Replace 100 with actual total product count
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getProductById, updateProduct } from '../index.js';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id);
                const productData = response.data.data;
                setProduct(productData);
                setValue('name', productData.name);
                setImagePreviews( productData.image);
                setValue('description', productData.description);
                setValue('price', productData.price);
                setValue('category', productData.category);
                setValue('subCategory', productData.subCategory);
                setValue('sizes', productData.sizes);
                setValue('tags', productData.tags.join(', ')); // Assuming tags are a comma-separated string
            } catch (error) {
                console.error("Error fetching product", error);
            }
        };

        fetchProduct();
    }, [id, setValue]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        // const previews = files.map(file => URL.createObjectURL(file));
        // setImagePreviews(previews);
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', data.price);
            formData.append('category', data.category);
            formData.append('subCategory', data.subCategory);
            formData.append('sizes', data.sizes);
            formData.append('tags', data.tags.split(',').map(tag => tag.trim())); // Convert tags to array

            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }

            await updateProduct(id, formData);
            navigate(-1); // Redirect to product list
        } catch (error) {
            console.error("Error updating product", error);
        }
    };

    return (
        <>
            <div className=" mx-auto p-6 ">
                {product && (
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <div className="">
                            <div className="">
                                <div className="flex flex-col md:flex-row items-center md:items-start">
                                    <div className="flex flex-col md:w-1/2">
                                        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

                                        <div>
                                            {/* <label className="block text-gray-700">Images</label> */}
                                            
                                            <div className="mt-4 w-full flex flex-wrap gap-2">
                                                {/* {imagePreviews.length>0 && imagePreviews?.map((preview, index) => ( */}
                                                    <img
                                                        // key={index}
                                                        src={imagePreviews}
                                                        // alt={`Preview ${imagePreviews + 1}`}
                                                        className="w-full object-cover border border-gray-300 rounded"
                                                    />
                                                {/* ))} */}
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageChange}
                                                className="w-full mt-4 p-2 border rounded border-gray-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="md:w-1/2 md:ml-8 md:mt-10">
                                        <div>
                                            <label className="block text-gray-700">Name</label>
                                            <input
                                                type="text"
                                                {...register('name', { required: 'Product name is required' })}
                                                className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-gray-700">Price</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                {...register('price', { required: 'Price is required' })}
                                                className={`w-full p-2 border rounded ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                                        </div>

                                        {/* <div className="flex items-center mb-4">
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                ))}
                {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
                {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                    <FaRegStar key={i} className="text-gray-300" />
                ))}
            </div> */}


                                        <div className='mt-4 font-normal'
                                        >
                                            <div>
                                                <label className="block text-gray-700">Category</label>
                                                <input
                                                    type="text"
                                                    {...register('category', { required: 'Category is required' })}
                                                    className={`w-full p-2 border rounded ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-gray-700">Subcategory</label>
                                                <input
                                                    type="text"
                                                    {...register('subCategory', { required: 'Subcategory is required' })}
                                                    className={`w-full p-2 border rounded ${errors.subCategory ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                                {errors.subCategory && <p className="text-red-500 text-sm">{errors.subCategory.message}</p>}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='mt-20'>
                                    <div className='border-b '>
                                        <ul className='flex w-full h-full text-md '>
                                            <li className=' h-full border py-3 px-6 font-semibold'>
                                                Description
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='flex flex-col space-y-2 text-gray-600 py-10'>
                                        <label className="block text-gray-700">Description</label>
                                        <textarea
                                            {...register('description', { required: 'Description is required' })}
                                            className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-6 px-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Update Product
                        </button>
                    </form>
                )}
            </div>
        </>
    );
};

export default EditProduct;

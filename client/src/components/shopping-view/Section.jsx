import React, { useState } from 'react';
import ShoppingProductTile from './product-tile';

function Section({ products, handleAddtoCart, handleGetProductDetails, userId, bestSeller }) {
  const [selectedCategory, setSelectedCategory] = useState('men'); 

  const salesProducts = products
    .filter(product => product?.salePrice > 0)
    .sort((a, b) => b.salePrice - a.salePrice)
    .slice(0, 4);

  const filteredProducts = products
    .filter(product => product.category === selectedCategory)
    .slice(0, 4);

  return (
    <div className="">
      {/* Category Dropdown */}
      <div className="px-8 md:px-32 mx-auto my-20 ">
        
       <div className='flex justify-between items-center '>
       <h2 className="text-3xl font-bold mb-8 text-center capitalize">
          New Arrivals {selectedCategory}
        </h2>
        <div className="mb-8 flex items-center">
          <label htmlFor="categoryDropdown" className="text-xl font-semibold mr-4">
            Select Category:
          </label>
          <select
            id="categoryDropdown"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-6 py-2 border bg-transparent "
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
       </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ShoppingProductTile
              key={index}
              handleGetProductDetails={handleGetProductDetails}
              product={product}
              userId={userId}
              handleAddtoCart={handleAddtoCart}
            />
          ))}
        </div>
        
      </div>
      {/* Bestsellers Section */}
      <div className="px-8 md:px-32 mx-auto my-20 ">
        <h2 className="text-4xl font-bold mb-8 text-center">Our Bestsellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSeller && bestSeller.length > 0
            ? bestSeller.map((productItem, index) => (
                <ShoppingProductTile
                  key={index}
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  userId={userId}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>

      
      {/* Sales Section */}
      <div className="px-8 md:px-32 mx-auto my-20 ">
        <h2 className="text-4xl font-bold mb-8 text-center">Top Sales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {salesProducts.map((product, index) => (
            <ShoppingProductTile
              key={index}
              handleGetProductDetails={handleGetProductDetails}
              product={product}
              userId={userId}
              handleAddtoCart={handleAddtoCart}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Section;

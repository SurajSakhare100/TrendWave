import React, { forwardRef } from 'react';

const Input = ({ label, type = 'text', placeholder, error, ...props }, ref) => {
  return (
    <div className="mb-4 text-black">
      {label && <label className="block text-gray-700 mb-2">{label}</label>}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`w-full p-2 border border-gray-300   ${error ? 'border-red-500' : ''} `}
        {...props} 
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default forwardRef(Input);

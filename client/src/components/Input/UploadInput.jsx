import React, { useState, forwardRef } from 'react';
import Button from '../Button/Button';

const UploadInput = forwardRef(({ label, onChange, accept = 'image/*', ...props }, ref) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file);
    }
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {label && <label className="mb-2 text-gray-700">{label}</label>}
      
      <div className="relative w-30 h-20 border-dashed border-2 border-gray-300 rounded-lg flex justify-center items-center">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <p className="text-gray-500">Click to Upload</p>
        )}
        <input
          type="file"
          ref={ref}
          accept={accept}
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileChange}
          {...props}
        />
      </div>

      {preview && (
        <Button
          className="mt-4"
          size='sm'
          onClick={() => setPreview(null)}
        >
          Remove Image
        </Button>
      )}
    </div>
  );
});

export default UploadInput;

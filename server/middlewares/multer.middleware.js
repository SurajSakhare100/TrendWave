import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products/'); // Set the destination folder
  },
  filename: function (req, file, cb) {
    // Set the filename to include a timestamp to avoid name conflicts
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

// Create multer instance
export const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB (optional)
}) // Accept up to 4 files with the field name 'images'

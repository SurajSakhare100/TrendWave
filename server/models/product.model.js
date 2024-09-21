import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory:{
        type: String,
        required: true,
    },
    tags: {
        type: [String], 
    },
    images: {
        type: [String], // Array of URLs or paths to images
        required: true,
    },
    sizes: {
        type: [String], // Array of available sizes (e.g., ["S", "M", "L", "XL"])
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;

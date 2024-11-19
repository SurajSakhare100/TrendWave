import axios from "axios";
// import { setUser } from "./app/slices/userSlice";
// import { useDispatch } from "react-redux";

export const base = "http://localhost:5000";
const API_URL = base+'/api/v1/products';
const handleResponse = (res) => res.data.data;
const handleError = (err) => {
  console.log(err.message);
  return [];
};
const createFormData = (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  };
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
// User-related functions
const registerUser = async (user) => {
    try {
      const response = await axiosInstance.post(`${base}/api/v1/users/register`,{...user});
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };
  
  
  const loginUser = async (form) => {
    try {
      const response = await axios.post(`${base}/api/v1/auth/loginuser`, {
        ...form
      }, {
        withCredentials: true,
      });
      // useDispatch(setUser(response));
      return handleResponse(response);
    } catch (error) {
      console.log('Error logging in:', error.message);
    }
  };
  
  const logoutUser = async () => {
    try {
      const response = await axiosInstance.post(`${url}/api/v1/auth/logout`, {});
  
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };
  const getCurrentUser = async () => {
    try {
      const response = await axiosInstance.get(`${url}/api/v1/auth/getuser`);
      // useDispatch(setUser(response.data));
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };
  
  const updatePassword = async (password) => {
    try {
      const response = await axiosInstance.post(`${url}/api/v1/auth/updatepassword`, password);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };




// Create new product
export const createProduct = async (productData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const { data } = await axios.post(API_URL, productData, config);
        return data;
    } catch (error) {
        console.error('Error creating product:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Get all products
export const getProducts = async () => {
    try {
        const { data } = await axios.get(API_URL);
        return data;
    } catch (error) {
        console.error('Error fetching products:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Get product by ID
export const getProductById = async (id) => {
    try {
        const  data  = await axios.get(`${API_URL}/${id}`,{withCredentials: true,});
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching product:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Update product
export const updateProduct = async (id, productData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const { data } = await axios.put(`${API_URL}/${id}`, productData, config);
        return data;
    } catch (error) {
        console.error('Error updating product:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Delete product
export const deleteProduct = async (id) => {
    try {
        const { data } = await axios.delete(`${API_URL}/${id}`);
        return data;
    } catch (error) {
        console.error('Error deleting product:', error.response?.data?.message || error.message);
        throw error;
    }
};


export {
    registerUser,
    updatePassword,
    loginUser,
    logoutUser,
    getCurrentUser,
}
  
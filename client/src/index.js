import axios from "axios";

export const base = "http://localhost:5000";
const API_URL = `${base}/api/v1/products`;

const axiosInstance = axios.create({
  baseURL: base,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const handleResponse = (res) => res.data;
const handleError = (err) => {
  const message = err.response?.data?.message || err.message || "An error occurred.";
  console.error("API Error:", message);
  throw new Error(message);
};

const createFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

// Authentication APIs
export const registerUser = async (data) => {
  try {
    const response = await axiosInstance.post('/api/v1/auth/register', data);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const loginUser = async (form) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/loginuser", { ...form });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/logout", {});
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/auth/getuser");
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const updatePassword = async (password) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/updatepassword", password);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Product APIs
export const createProduct = async (productData) => {
  try {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const response = await axiosInstance.post("/api/v1/products", productData, config);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/products");
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/products/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const response = await axiosInstance.put(`/api/v1/products/${id}`, productData, config);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/products/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

import axios from "axios";
// import { setUser } from "./app/slices/userSlice";
// import { useDispatch } from "react-redux";

export const url = "http://localhost:5000";
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
      const response = await axiosInstance.post(`${url}/api/v1/auth/registeruser`,{...user});
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };
  
  
  const loginUser = async (form) => {
    try {
      const response = await axios.post(`${url}/api/v1/auth/loginuser`, {
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

export {
    registerUser,
    updatePassword,
    loginUser,
    logoutUser,
    getCurrentUser,
}
  
// constant.js
export const DB_NAME = "Ecommerce";

export const options = {
  httpOnly: true,
//   secure: process.env.NODE_ENV === 'production',  
  secure: true,  
  sameSite: 'None',  
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),  
  domain: process.env.NODE_ENV === 'production' ? process.env.BACKEND_URL : 'localhost',  
};
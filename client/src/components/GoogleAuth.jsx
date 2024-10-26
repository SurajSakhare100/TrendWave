// src/components/GoogleAuth.js
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function GoogleAuth() {
  const navigate = useNavigate();

  const handleSuccess = async (tokenResponse) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/google-login",
        { token: tokenResponse.credential },
        { withCredentials: true }
      );

      if (response.data.user) {
        navigate('/');
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleError = (errorResponse) => {
    console.error('Google login failed', errorResponse);
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        flow="auth-code"
        useOneTap
        style={{ width: '100%', height: '50px' }} 
        className="w-full h-full"
      />
    </div>
  );
}

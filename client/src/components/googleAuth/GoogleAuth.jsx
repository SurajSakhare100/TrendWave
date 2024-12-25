// src/components/GoogleAuth.js
import { googleLogin } from '@/store/auth-slice';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function GoogleAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleSuccess = async (tokenResponse) => {
    try {
      const response = await
        dispatch(googleLogin({ token: tokenResponse.credential }))
      if (response.data.data) {
        navigate('/shop');
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
      />
    </div>
  );
}

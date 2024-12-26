// src/components/GoogleAuth.js
import { googleLogin } from '@/store/auth-slice';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function GoogleAuth() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleSuccess = async (tokenResponse) => {
    setLoading(true);
    try {
      const response = await dispatch(googleLogin({ token: tokenResponse.credential }));
      if (response.data.data) {
        navigate('/shop');
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (errorResponse) => {
    console.error('Google login failed', errorResponse);
  };

  return (
    <div className="w-full">
    {loading ? (
      <p>Loading...</p>
    ) : (
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        flow="auth-code"
        useOneTap
      />
    )}
  </div>

  );
}

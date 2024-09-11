// src/components/GoogleAuth.js
import { GoogleLogin } from '@react-oauth/google';

export function GoogleAuth() {
  const handleSuccess = (credentialResponse) => {
    // Assuming 'code' is the authorization code you receive
    const authorizationCode = credentialResponse.code;

    fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: authorizationCode }),
    })
    .then(response => {
      // Check if the response is JSON
      console.log('object')
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        throw new Error('Response is not JSON');
      }
    })
    .then(data => {
      console.log('Login successful, backend response:', data);
      // Handle successful login (e.g., redirect, store user info, etc.)
    })
    .catch(error => {
      console.error('Error exchanging authorization code:', error);
      // Optionally show an error message to the user
    });
  };

  const handleError = (errorResponse) => {
    console.error('Google login failed', errorResponse);
    // Optionally show an error message to the user
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        flow="auth-code" // Ensure this is the correct flow for your application
      />
    </div>
  );
}

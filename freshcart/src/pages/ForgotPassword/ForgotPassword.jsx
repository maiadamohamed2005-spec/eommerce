
import { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/forgotPasswords', { email });
      setMessage(response.data.message || 'Reset code sent successfully.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send reset code.');
    }
  };

  return (
    <main className="container py-5" style={{ maxWidth: '500px' }}>
      <h2 className="fw-bold mb-3">Forgot Password</h2>
      <p className="text-secondary">Enter your email to reset your password.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="btn btn-success w-100">Send Reset Code</button>
      </form>

      {message && <p className="mt-3">{message}</p>}

      <Link to="/login">Back to Login</Link>
    </main>
  );
}

export default ForgotPassword;

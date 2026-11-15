
import { useState } from 'react';
import api from '../../services/api';

function ChangePassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put('/auth/resetPassword', {
        email,
        newPassword,
      });

      setMessage(response.data.message || 'Password changed successfully.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to change password.');
    }
  };

  return (
    <main className="container py-5" style={{ maxWidth: '500px' }}>
      <h2 className="fw-bold mb-4">Change Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button className="btn btn-success w-100">Change Password</button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </main>
  );
}

export default ChangePassword;

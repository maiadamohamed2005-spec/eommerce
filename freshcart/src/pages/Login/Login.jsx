
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    try {
      setLoading(true);

      const response = await loginUser(formData);

      if (!response.token) {
        setError('Login response did not contain an authentication token.');
        return;
      }

      localStorage.setItem('token', response.token);

      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      navigate('/');
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        'Login failed. Please check your email and password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="card border-0 shadow-sm p-4">
            <div className="text-center mb-4">
              <h2 className="fw-bold">
                Welcome <span className="text-success">Back</span>
              </h2>
              <p className="text-secondary">
                Login to your FreshCart account.
              </p>
            </div>

            {error && (
              <div className="alert alert-danger">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 mt-2"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="text-center mt-4 mb-0">
              Don't have an account?{' '}
              <Link to="/register" className="text-success fw-bold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;

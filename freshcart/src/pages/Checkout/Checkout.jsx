
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [details, setDetails] = useState({
    details: '',
    phone: '',
    city: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cartResponse = await api.get('/cart');
      const cartId = cartResponse.data.data._id;

      const shippingAddress = {
        details: details.details,
        phone: details.phone,
        city: details.city,
      };

      if (paymentMethod === 'cash') {
        await api.post(`/orders/${cartId}`, {
          shippingAddress,
        });

        setMessage('Cash order created successfully.');
        navigate('/allorders');
      } else {
        const response = await api.post(
          `/orders/checkout-session/${cartId}?url=${window.location.origin}`,
          { shippingAddress }
        );

        if (response.data.session?.url) {
          window.location.href = response.data.session.url;
        } else {
          setMessage('Payment session could not be created.');
        }
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Checkout failed.');
    }
  };

  return (
    <main className="container py-5" style={{ maxWidth: '650px' }}>
      <h2 className="fw-bold mb-4">Checkout</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="details"
          className="form-control mb-3"
          placeholder="Address details"
          value={details.details}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          className="form-control mb-3"
          placeholder="Phone number"
          value={details.phone}
          onChange={handleChange}
          required
        />

        <input
          name="city"
          className="form-control mb-3"
          placeholder="City"
          value={details.city}
          onChange={handleChange}
          required
        />

        <h5 className="mt-4">Payment Method</h5>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            value="cash"
            checked={paymentMethod === 'cash'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label">Cash on Delivery</label>
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            value="online"
            checked={paymentMethod === 'online'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label">Online Payment</label>
        </div>

        <button className="btn btn-success w-100">
          Confirm Order
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </main>
  );
}

export default Checkout;

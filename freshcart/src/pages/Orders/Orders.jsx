
import { useEffect, useState } from 'react';
import api from '../../services/api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  return (
    <main className="container py-5">
      <h2 className="fw-bold mb-4">My Orders</h2>

      {loading && <p>Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p>No orders found.</p>
      )}

      {!loading && orders.map((order) => (
        <div className="card shadow-sm mb-3" key={order._id}>
          <div className="card-body">
            <h6>Order ID: {order._id}</h6>
            <p className="mb-1">
              Total Price: {order.totalOrderPrice} EGP
            </p>
            <p className="mb-1">
              Payment: {order.paymentMethodType}
            </p>
            <p className="mb-0">
              Delivered: {order.isDelivered ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      ))}
    </main>
  );
}

export default Orders;

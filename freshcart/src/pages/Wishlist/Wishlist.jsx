
import { useEffect, useState } from 'react';
import api from '../../services/api';

function Wishlist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWishlist = async () => {
    try {
      const response = await api.get('/wishlist');
      setProducts(response.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const removeProduct = async (id) => {
    try {
      await api.delete(`/wishlist/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container py-5">
      <h2 className="fw-bold mb-4">My Wishlist</h2>

      {loading && <p>Loading wishlist...</p>}

      {!loading && products.length === 0 && (
        <p>Your wishlist is empty.</p>
      )}

      <div className="row g-4">
        {products.map((product) => (
          <div className="col-6 col-md-4 col-lg-3" key={product._id}>
            <div className="card h-100 shadow-sm border-0">
              <img
                src={product.imageCover}
                alt={product.title}
                className="card-img-top p-3"
                style={{ height: '180px', objectFit: 'contain' }}
              />

              <div className="card-body">
                <h6>{product.title}</h6>
                <p className="text-success fw-bold">{product.price} EGP</p>

                <button
                  className="btn btn-outline-danger w-100"
                  onClick={() => removeProduct(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Wishlist;

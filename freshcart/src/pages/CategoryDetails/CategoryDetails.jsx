
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

function CategoryDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategoryProducts = async () => {
      try {
        const response = await api.get(`/products?category=${id}`);
        setProducts(response.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCategoryProducts();
  }, [id]);

  return (
    <main className="container py-5">
      <h2 className="fw-bold mb-4">Category Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div className="col-6 col-md-4 col-lg-3" key={product._id}>
              <Link
                to={`/products/${product._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="card-img-top p-3"
                    style={{ height: '180px', objectFit: 'contain' }}
                  />
                  <div className="card-body">
                    <h6>{product.title}</h6>
                    <p className="text-success fw-bold">{product.price} EGP</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default CategoryDetails;

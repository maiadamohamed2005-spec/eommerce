
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../services/productService';

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const data = await getProductById(id);

        setProduct(data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-success" />
        <p className="mt-3">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
        <Link to="/products" className="btn btn-success">
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) return null;

  return (
    <main className="container py-5">
      <div className="row align-items-center g-5">

        <div className="col-md-5">
          <img
            src={product.imageCover}
            alt={product.title}
            className="img-fluid rounded shadow-sm w-100"
            style={{
              maxHeight: '450px',
              objectFit: 'contain',
            }}
          />
        </div>

        <div className="col-md-7">

          <p className="text-success fw-bold">
            {product.category?.name}
          </p>

          <h2 className="fw-bold mb-3">
            {product.title}
          </h2>

          <p className="text-secondary">
            {product.description}
          </p>

          <h3 className="text-success fw-bold">
            {product.price} EGP
          </h3>

          <p className="text-warning">
            ★ {product.ratingsAverage}
          </p>

          <p>
            <strong>Available Quantity:</strong>{' '}
            {product.quantity}
          </p>

          <Link
            to="/products"
            className="btn btn-outline-success mt-3"
          >
            Back to Products
          </Link>

        </div>
      </div>
    </main>
  );
}

export default ProductDetails;

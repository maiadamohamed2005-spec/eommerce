
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/hero.png';
import { getAllProducts } from '../../services/productService';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getAllProducts();

        setProducts(Array.isArray(data) ? data.slice(0, 8) : []);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>

      {/* Hero Section */}
      <section className="container py-4">
        <div className="row align-items-center bg-light rounded-4 p-4 p-md-5">

          <div className="col-md-6">
            <span className="badge bg-success mb-3">
              Welcome to FreshCart
            </span>

            <h1 className="display-5 fw-bold mb-3">
              Make healthy life with fresh groceries
            </h1>

            <p className="text-secondary mb-4">
              Shop your daily essentials and discover our
              fresh products at the best prices.
            </p>

            <Link to="/products" className="btn btn-success px-4 py-2">
              Shop Now
            </Link>

            <Link to="/categories" className="btn btn-outline-success px-4 py-2 ms-2">
              Explore Categories
            </Link>
          </div>

          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img
              src={heroImage}
              alt="FreshCart groceries"
              className="img-fluid"
              style={{ maxHeight: '350px', objectFit: 'contain' }}
            />
          </div>

        </div>
      </section>

      {/* Store Features */}
      <section className="container py-5">
        <div className="row g-4">

          <div className="col-6 col-lg-3">
            <div className="border rounded-3 p-3 h-100 text-center">
              <h2 className="text-success">🚚</h2>
              <h6 className="fw-bold">Free Shipping</h6>
              <p className="text-secondary small mb-0">
                Free shipping on selected orders
              </p>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="border rounded-3 p-3 h-100 text-center">
              <h2 className="text-success">↩️</h2>
              <h6 className="fw-bold">Easy Returns</h6>
              <p className="text-secondary small mb-0">
                Easy return process
              </p>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="border rounded-3 p-3 h-100 text-center">
              <h2 className="text-success">🔒</h2>
              <h6 className="fw-bold">Secure Payment</h6>
              <p className="text-secondary small mb-0">
                Your payments are protected
              </p>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="border rounded-3 p-3 h-100 text-center">
              <h2 className="text-success">🎧</h2>
              <h6 className="fw-bold">24/7 Support</h6>
              <p className="text-secondary small mb-0">
                We are always here to help
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Products Section */}
      <section className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Featured Products</h2>
            <p className="text-secondary mb-0">
              Discover our latest products
            </p>
          </div>

          <Link to="/products" className="btn btn-outline-success">
            View All
          </Link>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-success" />
            <p className="mt-3">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-secondary">
            No products available.
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="row g-4">

            {products.map((product) => (
              <div
                className="col-6 col-md-4 col-lg-3"
                key={product._id}
              >
                <div className="card h-100 border-0 shadow-sm">

                  <img
                    src={product.imageCover}
                    className="card-img-top p-3"
                    alt={product.title}
                    style={{
                      height: '190px',
                      objectFit: 'contain',
                    }}
                  />

                  <div className="card-body d-flex flex-column">

                    <p className="text-secondary small mb-2">
                      {product.category?.name}
                    </p>

                    <h6 className="fw-bold">
                      {product.title}
                    </h6>

                    <div className="mt-auto">
                      <p className="text-success fw-bold mb-1">
                        {product.price} EGP
                      </p>

                      <p className="text-warning mb-0">
                        ★ {product.ratingsAverage || 'New'}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            ))}

          </div>
        )}

      </section>

      {/* Shop Banner */}
      <section className="container pb-5">
        <div className="bg-success text-white rounded-4 p-4 p-md-5 text-center">
          <h2 className="fw-bold">
            Fresh products, better prices!
          </h2>

          <p className="mb-4">
            Find everything you need in one place.
          </p>

          <Link to="/products" className="btn btn-light text-success fw-bold px-4">
            Start Shopping
          </Link>
        </div>
      </section>

    </main>
  );
}

export default Home;

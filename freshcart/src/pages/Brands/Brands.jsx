
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await api.get('/brands');
        setBrands(response.data.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load brands.');
      } finally {
        setLoading(false);
      }
    };

    getBrands();
  }, []);

  return (
    <main className="container py-5">
      <h2 className="fw-bold text-center mb-4">Our Brands</h2>

      {loading && <p className="text-center">Loading brands...</p>}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-4">
          {brands.map((brand) => (
            <div className="col-6 col-md-4 col-lg-3" key={brand._id}>
              <Link
                to={`/brands/${brand._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 text-center p-3 shadow-sm border-0">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="img-fluid"
                    style={{ height: '140px', objectFit: 'contain' }}
                  />
                  <h6 className="fw-bold mt-3">{brand.name}</h6>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Brands;


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return (
    <main className="container py-5">
      <h2 className="fw-bold text-center mb-4">Shop By Category</h2>

      {loading ? (
        <p className="text-center">Loading categories...</p>
      ) : (
        <div className="row g-4">
          {categories.map((category) => (
            <div className="col-6 col-md-4 col-lg-3" key={category._id}>
              <Link
                to={`/categories/${category._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 text-center shadow-sm border-0 p-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="img-fluid"
                    style={{ height: '150px', objectFit: 'contain' }}
                  />
                  <h6 className="fw-bold mt-3">{category.name}</h6>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Categories;

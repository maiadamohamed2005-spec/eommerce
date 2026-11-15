
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

function BrandDetails() {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBrand = async () => {
      try {
        const response = await api.get(`/brands/${id}`);
        setBrand(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getBrand();
  }, [id]);

  if (loading) return <div className="container py-5">Loading...</div>;

  if (!brand) return <div className="container py-5">Brand not found.</div>;

  return (
    <main className="container py-5 text-center">
      <img
        src={brand.image}
        alt={brand.name}
        style={{ height: '180px', objectFit: 'contain' }}
        className="img-fluid mb-3"
      />
      <h2 className="text-success fw-bold">{brand.name}</h2>
      <Link to="/brands" className="btn btn-outline-success mt-3">
        Back to Brands
      </Link>
    </main>
  );
}

export default BrandDetails;

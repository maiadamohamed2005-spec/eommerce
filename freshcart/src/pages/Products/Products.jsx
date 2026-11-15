
import { useEffect, useMemo, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { getAllProducts } from '../../services/productService';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const [message, setMessage] = useState('');

  const { addToCart } = useCart();

  // Get All Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getAllProducts();

        setProducts(data);
        setError('');

      } catch (err) {
        console.error(err);
        setError('Failed to load products.');

      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get Categories
  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => product.category?.name)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  // Search, Filter and Sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      result = result.filter((product) =>
        product.title
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(
        (product) => product.category?.name === selectedCategory
      );
    }

    // Sort Products
    if (sortBy === 'low') {
      result.sort((a, b) => a.price - b.price);

    } else if (sortBy === 'high') {
      result.sort((a, b) => b.price - a.price);

    } else if (sortBy === 'rating') {
      result.sort(
        (a, b) => b.ratingsAverage - a.ratingsAverage
      );
    }

    return result;

  }, [products, search, selectedCategory, sortBy]);

  // Add Product To Cart
  const handleAddToCart = (product) => {
    addToCart(product);

    setMessage(`${product.title} added to cart successfully!`);

    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <main className="container py-5">

      {/* Page Header */}

      <div className="text-center mb-5">

        <h1 className="fw-bold">
          Our <span className="text-success">Products</span>
        </h1>

        <p className="text-secondary">
          Explore our collection and find your favorite products.
        </p>

      </div>

      {/* Search, Category and Sorting */}

      <div className="row g-3 mb-4">

        {/* Search */}

        <div className="col-md-4">

          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* Categories */}

        <div className="col-md-4">

          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >

            <option value="all">
              All Categories
            </option>

            {categories.map((category) => (

              <option key={category} value={category}>
                {category}
              </option>

            ))}

          </select>

        </div>

        {/* Sorting */}

        <div className="col-md-4">

          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >

            <option value="default">
              Default Sorting
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

            <option value="rating">
              Highest Rating
            </option>

          </select>

        </div>

      </div>

      {/* Success Message */}

      {message && (

        <div className="alert alert-success alert-dismissible fade show">

          <i className="fa-solid fa-check-circle me-2"></i>

          {message}

          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage('')}
          ></button>

        </div>

      )}

      {/* Products Count */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h5 className="mb-0">
          All Products
        </h5>

        <span className="text-secondary">
          {filteredProducts.length} Products
        </span>

      </div>

      {/* Loading */}

      {loading && (

        <div className="text-center py-5">

          <div className="spinner-border text-success"></div>

          <p className="mt-3">
            Loading products...
          </p>

        </div>

      )}

      {/* Error */}

      {error && (

        <div className="alert alert-danger">
          {error}
        </div>

      )}

      {/* No Products */}

      {!loading && !error && filteredProducts.length === 0 && (

        <div className="text-center py-5">

          <h4>
            No Products Found
          </h4>

          <p className="text-secondary">
            Try another search or category.
          </p>

        </div>

      )}

      {/* Products Cards */}

      {!loading && !error && filteredProducts.length > 0 && (

        <div className="row g-4">

          {filteredProducts.map((product) => (

            <div
              className="col-6 col-md-4 col-lg-3"
              key={product._id}
            >

              <div className="card h-100 border-0 shadow-sm">

                {/* Product Image */}

                <img
                  src={product.imageCover}
                  className="card-img-top p-3"
                  alt={product.title}
                  style={{
                    height: '190px',
                    objectFit: 'contain',
                  }}
                />

                {/* Product Information */}

                <div className="card-body d-flex flex-column">

                  <small className="text-secondary">
                    {product.category?.name}
                  </small>

                  <h6 className="fw-bold mt-2">
                    {product.title}
                  </h6>

                  <p className="text-success fw-bold mb-1">
                    {product.price} EGP
                  </p>

                  <p className="text-warning mb-3">
                    ★ {product.ratingsAverage}
                  </p>

                  {/* Add To Cart Button */}

                  <button
                    className="btn btn-success w-100 mt-auto"
                    onClick={() => handleAddToCart(product)}
                  >

                    <i className="fa-solid fa-cart-shopping me-2"></i>

                    Add To Cart

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}

export default Products;


import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, UserRound } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ShoppingBasket } from 'lucide-react';
function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">

      <Link className="navbar-brand fw-bold" to="/">
  <ShoppingBasket size={28} className="me-2 text-success" />
  FreshCart
</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">

          <div className="navbar-nav mx-auto gap-lg-3">

            <NavLink className="nav-link" to="/">
              Home
            </NavLink>

            <NavLink className="nav-link" to="/products">
              Products
            </NavLink>

            <NavLink className="nav-link" to="/categories">
              Categories
            </NavLink>

            <NavLink className="nav-link" to="/brands">
              Brands
            </NavLink>

          </div>

          <div className="d-flex align-items-center gap-4 mt-3 mt-lg-0">

            <Link to="/login" className="text-dark">
              <UserRound size={23} />
            </Link>

            <Link
              to="/cart"
              className="text-dark position-relative"
            >
              <ShoppingCart size={25} />

              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                  style={{ fontSize: '11px' }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;

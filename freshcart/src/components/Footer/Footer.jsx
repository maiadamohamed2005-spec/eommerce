import './Footer.css';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Truck,
  RefreshCcw,
  ShieldCheck,
  Headset
} from 'lucide-react';

function Footer() {
  return (
    <footer className="freshcart-footer">

      {/* Features */}
      <div className="container footer-features">
        <div className="row g-4">

          <div className="col-6 col-lg-3">
            <div className="footer-feature">
              <Truck size={30} />
              <h6>Free Shipping</h6>
              <p>On orders over 500 EGP</p>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="footer-feature">
              <RefreshCcw size={30} />
              <h6>Easy Returns</h6>
              <p>14-day return policy</p>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="footer-feature">
              <ShieldCheck size={30} />
              <h6>Secure Payment</h6>
              <p>100% secure checkout</p>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <Link to="/contact" className="footer-feature support-feature">
              <Headset size={30} />
              <h6>24/7 Support</h6>
              <p>We are always here to help</p>
            </Link>
          </div>

        </div>
      </div>

      <hr />

      {/* Main Footer */}
      <div className="container footer-main">

        <div className="row g-4">

          {/* About */}
          <div className="col-lg-4 col-md-6">

            <Link to="/" className="footer-logo">
              FreshCart
            </Link>

            <p className="footer-description">
              FreshCart is your one-stop destination for quality products.
              From fashion to electronics, we bring you the best brands
              at competitive prices with a seamless shopping experience.
            </p>

            <div className="footer-contact-info">

              <p>
                <Phone size={17} />
                <a href="tel:+18001234567">
                  +1 (800) 123-4567
                </a>
              </p>

              <p>
                <Mail size={17} />
                <a href="mailto:support@freshcart.com">
                  support@freshcart.com
                </a>
              </p>

              <p>
                <MapPin size={17} />
                123 Commerce Street, New York, NY 10001
              </p>

            </div>

          </div>

          {/* Shop */}
          <div className="col-lg-2 col-md-6">

            <h5>Shop</h5>

            <ul>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/brands">Brands</Link></li>
              <li>
                <Link to="/products?category=6439d58a0049ad0b52b9003f">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=6439d2d167d9aa4ca970649f">
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link to="/products?category=6439d5b90049ad0b52b90048">
                  Women's Fashion
                </Link>
              </li>
            </ul>

          </div>

          {/* Account */}
          <div className="col-lg-2 col-md-6">

            <h5>Account</h5>

            <ul>
              <li><Link to="/login">My Account</Link></li>
              <li><Link to="/allorders">Order History</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Create Account</Link></li>
            </ul>

          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6">

            <h5>Support</h5>

            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/contact">Help Center</Link></li>
              <li><Link to="/contact">Shipping Info</Link></li>
              <li><Link to="/contact">Returns & Refunds</Link></li>
              <li><Link to="/contact">Track Order</Link></li>
            </ul>

          </div>

          {/* Legal */}
          <div className="col-lg-2 col-md-6">

            <h5>Legal</h5>

            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
            </ul>

          </div>

        </div>

      </div>

      <hr />

      {/* Copyright */}
      <div className="container">

        <p className="footer-copyright">
          © 2026 FreshCart. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;


import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';

import Brands from './pages/Brands/Brands';
import BrandDetails from './pages/BrandDetails/BrandDetails';

import Categories from './pages/Categories/Categories';
import CategoryDetails from './pages/CategoryDetails/CategoryDetails';

import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ChangePassword from './pages/ChangePassword/ChangePassword';

import Cart from './pages/Cart/Cart';
import Wishlist from './pages/Wishlist/Wishlist';
import Checkout from './pages/Checkout/Checkout';
import Orders from './pages/Orders/Orders';

import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/brands" element={<Brands />} />
        <Route path="/brands/:id" element={<BrandDetails />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<CategoryDetails />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/changepassword" element={<ChangePassword />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/allorders" element={<Orders />} />

        <Route
          path="*"
          element={
            <div className="container py-5 text-center">
              <h2>404 - Page Not Found</h2>
              <p className="text-secondary">
                The page you are looking for does not exist.
              </p>
            </div>
          }
        />
      </Routes>

      <Footer />
    </CartProvider>
  );
}

export default App;

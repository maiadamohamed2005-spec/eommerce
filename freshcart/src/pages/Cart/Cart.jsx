
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Cart() {
  const {
    cartItems,
    cartCount,
    subtotal,
    removeItem,
    updateQuantity,
  } = useCart();

  return (
    <main className="container py-5">

      <h2 className="fw-bold mb-2">Shopping Cart</h2>

      <p className="text-secondary mb-4">
        You have {cartCount} items in your cart
      </p>

      {cartItems.length === 0 ? (

        <div className="text-center py-5">
          <i className="fa-solid fa-cart-shopping text-secondary fa-3x mb-3"></i>

          <h4>Your Cart Is Empty</h4>

          <p className="text-secondary">
            Start shopping and add your favorite products.
          </p>

          <Link to="/products" className="btn btn-success mt-2">
            Continue Shopping
          </Link>
        </div>

      ) : (

        <div className="row g-4">

          {/* Cart Products */}

          <div className="col-lg-8">

            {cartItems.map((item) => (

              <div
                className="card border-0 shadow-sm mb-3 p-3"
                key={item.product._id}
              >

                <div className="row align-items-center g-3">

                  <div className="col-4 col-md-3">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="img-fluid"
                      style={{
                        height: '130px',
                        width: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </div>

                  <div className="col-8 col-md-9">

                    <div className="d-flex justify-content-between">

                      <div>
                        <h6 className="fw-bold">
                          {item.product.title}
                        </h6>

                        <p className="text-success fw-bold mb-2">
                          {item.price} EGP
                        </p>
                      </div>

                      <button
                        className="btn btn-sm text-danger"
                        onClick={() => removeItem(item.product._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>

                    </div>

                    <div className="d-flex align-items-center gap-3">

                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.count - 1
                          )
                        }
                        disabled={item.count <= 1}
                      >
                        -
                      </button>

                      <span className="fw-bold">
                        {item.count}
                      </span>

                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.count + 1
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

            <Link
              to="/products"
              className="btn btn-outline-success mt-2"
            >
              Continue Shopping
            </Link>

          </div>

          {/* Order Summary */}

          <div className="col-lg-4">

            <div className="card border-0 shadow-sm p-4">

              <h5 className="fw-bold mb-4">
                Order Summary
              </h5>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">
                  Subtotal ({cartCount} items)
                </span>

                <strong>
                  {subtotal.toFixed(2)} EGP
                </strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">
                  Shipping
                </span>

                <span className="text-secondary">
                  Calculated at checkout
                </span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <strong>Estimated Total</strong>

                <strong className="text-success">
                  {subtotal.toFixed(2)} EGP
                </strong>
              </div>

              <Link
                to="/login?redirect=/cart"
                className="btn btn-success w-100 py-2 fw-bold"
              >
                Login to Checkout
              </Link>

              <p className="text-center text-secondary small mt-3">
                Don't have an account?{' '}
                <Link
                  to="/register?redirect=/cart"
                  className="text-success fw-bold"
                >
                  Sign up
                </Link>
              </p>

              <hr />

              <p className="small text-secondary mb-2">
                <i className="fa-solid fa-check text-success me-2"></i>
                Your cart items will be saved
              </p>

              <p className="small text-secondary mb-2">
                <i className="fa-solid fa-check text-success me-2"></i>
                Track your orders easily
              </p>

              <p className="small text-secondary mb-0">
                <i className="fa-solid fa-check text-success me-2"></i>
                Access exclusive member deals
              </p>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default Cart;

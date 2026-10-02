import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Convert role safely
  const role = user?.role?.toLowerCase();

  const isAdmin = role === "admin";
  const isSeller = role === "seller" || role === "entrepreneur";
  const isBuyer = role === "buyer" || role === "customer" || !role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("storage"));

    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        HunarHub
      </Link>

      <ul className="nav-links">
        {user ? (
          <>
            {/* ================= ADMIN NAVBAR ================= */}
            {isAdmin && (
              <>
                <li>
                  <Link to="/admin/dashboard">
                    🛠️ Admin Dashboard
                  </Link>
                </li>
              </>
            )}

            {/* ================= BUYER NAVBAR ================= */}
            {isBuyer && (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/marketplace">Marketplace</Link>
                </li>

                <li>
                  <Link to="/orders">My Orders</Link>
                </li>

                <li>
                  <Link to="/wishlist">❤️ Wishlist</Link>
                </li>

                <li>
                  <Link to="/cart" className="cart-link">
                    🛒 Cart

                    {totalItems > 0 && (
                      <span className="cart-badge">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </li>
              </>
            )}

            {/* ================= SELLER NAVBAR ================= */}
            {isSeller && (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/seller/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link to="/seller/add-product">
                    Add Product
                  </Link>
                </li>

                <li>
                  <Link to="/seller/my-products">
                    My Products
                  </Link>
                </li>
              </>
            )}

            {/* User Name */}
            <li
              style={{
                color: "white",
                fontWeight: "600",
              }}
            >
              Hi, {user.fullName || user.name}
            </li>

            {/* Logout */}
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {/* ================= GUEST NAVBAR ================= */}
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/marketplace">
                Marketplace
              </Link>
            </li>

            <li>
              <Link to="/login">
                Login
              </Link>
            </li>

            <li>
              <Link to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
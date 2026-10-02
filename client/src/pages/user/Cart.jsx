import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "30px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <h1 style={{ color: "#1e3a8a", margin: 0 }}>🛒 My Cart</h1>

        <Link to="/marketplace">
          <button
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "2px solid #1e3a8a",
              background: "white",
              color: "#1e3a8a",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            ← Continue Shopping
          </button>
        </Link>
      </div>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "50px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <h2>Your cart is empty</h2>
          <p>Add some handmade products from the marketplace.</p>

          <Link to="/marketplace">
            <button
              style={{
                background: "#1e3a8a",
                color: "white",
                border: "none",
                padding: "12px 25px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Go to Marketplace
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                background: "white",
                borderRadius: "18px",
                padding: "20px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 8px" }}>{item.name}</h3>
                <p style={{ margin: "4px 0", color: "#555" }}>
                  📍 {item.location}
                </p>
                <p style={{ margin: "4px 0", color: "#1e3a8a" }}>
                  {item.category}
                </p>
                <h2 style={{ color: "#1e3a8a" }}>₹{item.price}</h2>
              </div>

              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "15px",
                  }}
                >
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity - 1)
                    }
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                    }}
                  >
                    −
                  </button>

                  <strong>{item.quantity}</strong>

                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity + 1)
                    }
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "8px 18px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "25px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <h2>Total Amount</h2>
              <h2 style={{ color: "#1e3a8a" }}>₹{totalPrice}</h2>
            </div>

            <button
                onClick={() => navigate("/checkout")}
                style={{
                    width: "100%",
                    background: "#1e3a8a",
                    color: "white",
                    border: "none",
                    padding: "15px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginTop: "20px",
                    fontSize: "16px",
                    fontWeight: "600",
                }}
                >
                Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
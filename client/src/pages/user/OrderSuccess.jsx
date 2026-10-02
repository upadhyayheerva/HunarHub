import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();

  const orderId = location.state?.orderId || "HH000000";
  const customer = location.state?.customer || "Customer";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          maxWidth: "600px",
          width: "100%",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            background: "#22c55e",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 20px",
            fontSize: "40px",
            color: "white",
          }}
        >
          ✓
        </div>

        <h1 style={{ color: "#1e3a8a", marginBottom: "10px" }}>
          Order Placed Successfully!
        </h1>

        <p style={{ color: "#555", marginBottom: "20px" }}>
          Thank you, <strong>{customer}</strong>. Your order has been placed.
        </p>

        <div
          style={{
            background: "#eef4ff",
            padding: "18px",
            borderRadius: "12px",
            marginBottom: "25px",
          }}
        >
          <h3 style={{ margin: 0 }}>Order ID</h3>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#1e3a8a",
            }}
          >
            {orderId}
          </p>
        </div>

        <p style={{ color: "#666", lineHeight: "1.6" }}>
          Your handmade products will be prepared by the artisan and shipped
          soon. Thank you for supporting local craftsmanship.
        </p>

        <Link to="/marketplace">
          <button
            style={{
              marginTop: "25px",
              background: "#1e3a8a",
              color: "white",
              border: "none",
              padding: "14px 28px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
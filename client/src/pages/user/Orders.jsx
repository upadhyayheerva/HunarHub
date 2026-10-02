import { useEffect, useState } from "react";
import { getOrders } from "../../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  const loadOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        return;
      }

      const userId = user._id || user.id;

      const response = await getOrders(userId);

      setOrders(response.orders || []);
    } catch (error) {
      console.log(error);
    }
  };

  loadOrders();
}, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "30px",
      }}
    >
      <h1 style={{ color: "#1e3a8a", marginBottom: "25px" }}>
        📦 My Orders
      </h1>

      {orders.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "18px",
            textAlign: "center",
          }}
        >
          <h2>No Orders Yet</h2>
          <p>Your orders will appear here after checkout.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              background: "white",
              borderRadius: "18px",
              padding: "25px",
              marginBottom: "20px",
              boxShadow: "0 5px 20px rgba(0,0,0,.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <div>
                <h3 style={{ color: "#1e3a8a" }}>
                  Order #{order._id.slice(-8)}
                </h3>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              <div
                style={{
                  background: "#fef3c7",
                  color: "#92400e",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  height: "fit-content",
                  fontWeight: "600",
                }}
              >
                {order.status}
              </div>
            </div>

            <h4>{order.customerName}</h4>

            {order.items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "12px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <p style={{ margin: "5px 0", color: "#555" }}>
                    Qty: {item.quantity}
                  </p>
                </div>

                <strong>₹{item.price * item.quantity}</strong>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <strong style={{ color: "#1e3a8a" }}>
                Total: ₹{order.totalAmount}
              </strong>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
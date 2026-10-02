import { useEffect, useState } from "react";
import API from "../../api";
import "./ManageOrders.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/admin/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Unable to load orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.put(
        `/admin/orders/${id}/status`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === id
            ? {
                ...order,
                status: response.data.order.status,
              }
            : order
        )
      );

      alert("Order status updated successfully");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to update order status"
      );
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="admin-page-message">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page-error">
        {error}
      </div>
    );
  }

  return (
    <div className="admin-manage-page">
      <div className="admin-page-header">
        <h1>Manage Orders</h1>

        <p>
          View and manage all HunarHub customer orders.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="admin-empty">
          No orders found.
        </div>
      ) : (
        <div className="admin-orders-container">
          {orders.map((order) => (
            <div
              className="admin-order-card"
              key={order._id}
            >
              {/* Order Header */}

              <div className="admin-order-header">
                <div>
                  <h2>
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h2>

                  <p>
                    Ordered on{" "}
                    {formatDate(order.createdAt)}
                  </p>
                </div>

                <div className="admin-order-total">
                  ₹
                  {Number(order.totalAmount).toLocaleString(
                    "en-IN"
                  )}
                </div>
              </div>

              {/* Customer Information */}

              <div className="admin-order-section">
                <h3>Customer Information</h3>

                <div className="admin-order-details">
                  <p>
                    <strong>Name:</strong>{" "}
                    {order.customerName ||
                      order.userId?.fullName ||
                      "Not available"}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {order.userId?.email ||
                      "Not available"}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {order.phone || "Not available"}
                  </p>

                  <p>
                    <strong>Address:</strong>{" "}
                    {order.address || "Not available"}
                  </p>

                  <p>
                    <strong>City:</strong>{" "}
                    {order.city || "Not available"}
                  </p>

                  <p>
                    <strong>State:</strong>{" "}
                    {order.state || "Not available"}
                  </p>

                  <p>
                    <strong>Pincode:</strong>{" "}
                    {order.pincode || "Not available"}
                  </p>
                </div>
              </div>

              {/* Products */}

              <div className="admin-order-section">
                <h3>Ordered Products</h3>

                <div className="admin-order-items">
                  {order.items?.map((item, index) => (
                    <div
                      className="admin-order-item"
                      key={index}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="admin-order-item-info">
                        <h4>{item.name}</h4>

                        <p>
                          Quantity: {item.quantity}
                        </p>

                        <p>
                          Price: ₹
                          {Number(
                            item.price
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}

              <div className="admin-order-status">
                <div>
                  <strong>Order Status:</strong>

                  <span
                    className={`order-status ${order.status
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {order.status}
                  </span>
                </div>

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order._id,
                      e.target.value
                    )
                  }
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Confirmed">
                    Confirmed
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/orderService";

function Checkout() {
  const navigate = useNavigate();

  const { cart, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      // Get logged-in user
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login before placing an order.");
        navigate("/login");
        return;
      }

      // Get user ID
      const userId = user._id || user.id;

      if (!userId) {
        alert("User ID not found. Please login again.");
        return;
      }

      // Order data
      const orderData = {
        userId: userId,

        customerName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,

        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),

        totalAmount: totalPrice,

        status: "Pending",
      };

      console.log("Order Data:", orderData);

      const response = await createOrder(orderData);

      console.log("Order Created:", response);

      // Clear cart after successful order
      clearCart();

      // Go to success page
      navigate("/order-success", {
        state: {
          orderId: response.order._id,
          customer: formData.fullName,
        },
      });

    } catch (error) {
      console.log("Place Order Error:", error);

      if (error.response) {
        console.log("Server Response:", error.response.data);
      }

      alert("Failed to place order.");
    }
  };

  return (
    <div
      style={{
        background: "#f4f7fb",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1 style={{ color: "#1e3a8a" }}>
        Checkout
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "30px",
          marginTop: "20px",
        }}
      >
        {/* Shipping Form */}

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>Shipping Address</h2>

          {[
            "fullName",
            "phone",
            "address",
            "city",
            "state",
            "pincode",
          ].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.replace(
                /([A-Z])/g,
                " $1"
              )}
              value={formData[field]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                margin: "12px 0",
                borderRadius: "8px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          ))}
        </div>

        {/* Order Summary */}

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            height: "fit-content",
          }}
        >
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "12px 0",
              }}
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          <hr />

          <h2 style={{ color: "#1e3a8a" }}>
            Total: ₹{totalPrice}
          </h2>

          <button
            onClick={placeOrder}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#1e3a8a",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
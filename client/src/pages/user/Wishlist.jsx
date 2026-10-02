import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../../services/wishlistService";
import { useCart } from "../../context/CartContext";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
  let ignore = false;

  async function fetchWishlist() {
    try {
      const data = await getWishlist();

      if (!ignore) {
        setWishlist(data.wishlist);
      }
    } catch (error) {
      console.log(error);
    }
  }

  fetchWishlist();

  return () => {
    ignore = true;
  };
}, []);

  const handleRemove = async (id) => {
    try {
      await removeFromWishlist(id);
      setWishlist((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (item) => {
  addToCart({
    _id: item.productId, // Original Product ID
    name: item.name,
    image: item.image,
    price: item.price,
    category: item.category,
    location: item.location,
  });

  alert(`${item.name} added to cart!`);
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "30px",
      }}
    >
      <h1 style={{ color: "#1e3a8a", marginBottom: "25px" }}>
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "18px",
            textAlign: "center",
          }}
        >
          <h2>Your Wishlist is Empty</h2>
          <p>Save your favorite handmade products here.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {wishlist.map((item) => (
            <div
              key={item._id}
              style={{
                background: "white",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 5px 20px rgba(0,0,0,.08)",
              }}
            >
            <div
                style={{
                    aspectRatio: "1 / 1",
                    overflow: "hidden",
                    background: "#f8fafc",
                }}
                >
                <img
                    src={item.image}
                    alt={item.name}
                    style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "0.3s",
                    }}
                />
            </div>

              <div style={{ padding: "18px" }}>
                <h3>{item.name}</h3>

                <p>{item.category}</p>

                <p>{item.location}</p>

                <h3 style={{ color: "#1e3a8a" }}>₹{item.price}</h3>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  <button
                    onClick={() => handleAddToCart(item)}
                    style={{
                        flex: 1,
                        background: "#1e3a8a",
                        color: "white",
                        border: "none",
                        padding: "12px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "600",
                    }}
                    >
                    🛒 Add to Cart
                </button>

                  <button
                    onClick={() => handleRemove(item._id)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
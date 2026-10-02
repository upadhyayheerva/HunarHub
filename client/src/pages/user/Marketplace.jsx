import { useEffect, useMemo, useState } from "react";
import { getAllProducts } from "../../services/buyerProductService";
import { useCart } from "../../context/CartContext";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../../services/wishlistService";

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
  const loadData = async () => {
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);

      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        const wishlistData = await getWishlist();
        setWishlist(wishlistData.wishlist);
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadData();
}, []);

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((p) => p.category))];
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return searchMatch && categoryMatch;
  });

  const toggleWishlist = async (product) => {
  try {
    const existing = wishlist.find(
      (item) => item.productId === product._id
    );

    if (existing) {
      await removeFromWishlist(existing._id);

      setWishlist((prev) =>
        prev.filter((item) => item._id !== existing._id)
      );
    } else {
      const response = await addToWishlist(product);

      setWishlist((prev) => [...prev, response.wishlistItem]);
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "30px",
      }}
    >
      <h1
        style={{
          color: "#1e3a8a",
          marginBottom: "25px",
        }}
      >
        Explore Handmade Products
      </h1>

      <input
        type="text"
        placeholder="Search handmade products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "450px",
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              background:
                selectedCategory === category
                  ? "#1e3a8a"
                  : "white",
              color:
                selectedCategory === category
                  ? "white"
                  : "#1e3a8a",
              border: "1px solid #1e3a8a",
              padding: "10px 18px",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,320px))",
            justifyContent: "center",
          gap: "25px",
        }}
      >
        {filteredProducts.map((product) => (
  <div
    key={product._id}
    style={{
      background: "white",
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      transition: "0.3s",
      display: "flex",
      flexDirection: "column",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-6px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    <div
      style={{
        position: "relative",
        aspectRatio: "1 / 1",
        overflow: "hidden",
        background: "#f8fafc",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "0.4s",
        }}
      />

      <button
          onClick={() => {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
              alert("Please login to use Wishlist.");
              return;
            }

            toggleWishlist(product);
          }}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            border: "none",
            background: "white",
            cursor: "pointer",
            fontSize: "20px",
            boxShadow: "0 3px 10px rgba(0,0,0,.15)",
          }}
        >
          {wishlist.some((item) => item.productId === product._id)
            ? "❤️"
            : "🤍"}
        </button>
    </div>

    <div
      style={{
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <span
        style={{
          background: "#eaf2ff",
          color: "#1e3a8a",
          padding: "6px 12px",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "600",
          width: "fit-content",
          marginBottom: "12px",
        }}
      >
        {product.category}
      </span>

      <h3
        style={{
          margin: "0 0 8px",
          fontSize: "20px",
        }}
      >
        {product.name}
      </h3>

      <p
        style={{
          color: "#64748b",
          marginBottom: "12px",
        }}
      >
        📍 {product.location}
      </p>

      <h2
        style={{
          color: "#1e3a8a",
          marginBottom: "18px",
        }}
      >
        ₹{product.price}
      </h2>

      <button
  onClick={() => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  }}
  style={{
    marginTop: "auto",
    width: "100%",
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
  }}
>
  🛒 Add to Cart
</button>
    </div>
  </div>
))}
      </div>

      {filteredProducts.length === 0 && (
        <p style={{ marginTop: "30px" }}>
          No products found.
        </p>
      )}
    </div>
  );
}

export default Marketplace;
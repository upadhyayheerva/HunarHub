import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  const loadProducts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get(
        `/products/my-products?entrepreneurId=${user._id || user.id}`
      );

      setProducts(res.data.products || res.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load your products.");
    }
  };

  loadProducts();
}, []);


  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this product?");

    if (!ok) return;

    try {
      await API.delete(`/products/${id}`);

      setProducts((prev) => prev.filter((item) => item._id !== id));

      alert("Product deleted successfully.");
    } catch (error) {
      console.log(error);
      alert("Delete failed.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div>
            <h1 style={{ color: "#1e3a8a", margin: 0 }}>My Products</h1>
            <p style={{ color: "#64748b", marginTop: "6px" }}>
              Manage your handmade products.
            </p>
          </div>

          <Link
            to="/seller/dashboard"
            style={{
              textDecoration: "none",
              background: "#1e3a8a",
              color: "white",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: "600",
            }}
          >
            Dashboard
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search your products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "25px",
            fontSize: "15px",
          }}
        />

        {filteredProducts.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "50px",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,.08)",
            }}
          >
            <h2 style={{ color: "#1e3a8a" }}>No Products Yet</h2>
            <p style={{ color: "#64748b" }}>
              Start selling by adding your first handmade product.
            </p>

            <Link
              to="/seller/add-product"
              style={{
                display: "inline-block",
                marginTop: "20px",
                textDecoration: "none",
                background: "#2563eb",
                color: "white",
                padding: "12px 22px",
                borderRadius: "8px",
                fontWeight: "600",
              }}
            >
              Add Product
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: "20px",
            }}
          >
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                style={{
                  background: "white",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 5px 15px rgba(0,0,0,.08)",
                  transition: "0.3s",
                }}
              >
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: "15px" }}>
                  <h3 style={{ marginBottom: "8px" }}>{product.name}</h3>

                  <p
                    style={{
                      color: "#2563eb",
                      fontWeight: "600",
                      marginBottom: "8px",
                    }}
                  >
                    {product.category?.name || product.category || "Handmade Crafts"}
                  </p>

                  <h2 style={{ color: "#1e3a8a", marginBottom: "10px" }}>
                    ₹{product.price}
                  </h2>

                  <p
                    style={{
                      color: "#555",
                      fontSize: "14px",
                      minHeight: "40px",
                    }}
                  >
                    {product.description}
                  </p>

                  <p style={{ color: "#64748b", fontSize: "14px" }}>
                    📍 {product.location}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "15px",
                    }}
                  >
                    <button
                      onClick={() =>
                        navigate(`/seller/edit-product/${product._id}`)
                      }
                      style={{
                        flex: 1,
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      style={{
                        flex: 1,
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProducts;
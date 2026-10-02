import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState({
  totalProducts: 0,
  totalValue: 0,
  totalCategories: 0,
  totalLocations: 0,
  latestProducts: [],
  categoryCount: {},
});

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadDashboard();
  }, []);

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
        }}
      >
        <h1 style={{ color: "#1e3a8a" }}>Seller Dashboard</h1>

        <Link
          to="/seller/add-product"
          style={{
            background: "#1e3a8a",
            color: "white",
            textDecoration: "none",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          + Add Product
        </Link>
      </div>

      {/* Statistics Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        <Card title="Total Products" value={stats.totalProducts} />
        <Card title="Inventory Value" value={`₹${stats.totalValue}`} />
        <Card title="Categories" value={stats.totalCategories} />
        <Card title="Locations" value={stats.totalLocations} />
      </div>
      <div
  style={{
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "30px",
    boxShadow: "0 5px 20px rgba(0,0,0,.08)",
  }}
>
  <h2 style={{ color: "#1e3a8a", marginBottom: "20px" }}>
    Products by Category
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
      gap: "15px",
    }}
  >
    {Object.entries(stats.categoryCount).map(([category, count]) => (
      <div
        key={category}
        style={{
          background: "#eef4ff",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <h3 style={{ color: "#1e3a8a" }}>{count}</h3>
        <p style={{ marginTop: "8px" }}>{category}</p>
      </div>
    ))}
  </div>
</div>
      {/* Latest Products */}

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 5px 20px rgba(0,0,0,.08)",
        }}
      >
        <h2 style={{ color: "#1e3a8a", marginBottom: "20px" }}>
          Latest Products
        </h2>

        {stats.latestProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
            }}
          >
            {stats.latestProducts.map((product) => (
              <div
                key={product._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: "15px" }}>
                  <h3 style={{ marginBottom: "8px" }}>{product.name}</h3>

                  <p style={{ color: "#666", marginBottom: "8px" }}>
                    {product.location}
                  </p>

                  <h3 style={{ color: "#1e3a8a" }}>₹{product.price}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "15px",
        padding: "25px",
        textAlign: "center",
        boxShadow: "0 5px 20px rgba(0,0,0,.08)",
      }}
    >
      <h3 style={{ color: "#666", marginBottom: "10px" }}>{title}</h3>

      <h1 style={{ color: "#1e3a8a" }}>{value}</h1>
    </div>
  );
}

export default Dashboard;
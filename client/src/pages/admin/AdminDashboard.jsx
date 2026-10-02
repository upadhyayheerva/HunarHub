import { useEffect, useState } from "react";
import API from "../../api";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEntrepreneurs: 0,
    pendingEntrepreneurs: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(response.data);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Unable to load dashboard statistics"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        {error}
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>
            Welcome to the HunarHub administration panel.
          </p>
        </div>
      </div>

      <div className="admin-stats-grid">

        <div className="admin-stat-card">
          <div className="stat-icon">👥</div>
          <div>
            <h3>{stats.totalUsers}</h3>
            <p>Total Customers</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">🧑‍💼</div>
          <div>
            <h3>{stats.totalEntrepreneurs}</h3>
            <p>Entrepreneurs</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">⏳</div>
          <div>
            <h3>{stats.pendingEntrepreneurs}</h3>
            <p>Pending Approvals</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">🛍️</div>
          <div>
            <h3>{stats.totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">📦</div>
          <div>
            <h3>{stats.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">₹</div>
          <div>
            <h3>
              ₹{Number(stats.totalRevenue).toLocaleString("en-IN")}
            </h3>
            <p>Total Revenue</p>
          </div>
        </div>

      </div>

      <div className="admin-section">

        <h2>Quick Actions</h2>

        <div className="admin-actions">

          <button
            onClick={() =>
              (window.location.href = "/admin/entrepreneurs")
            }
          >
            👤 Manage Entrepreneurs
          </button>

          <button
            onClick={() =>
              (window.location.href = "/admin/users")
            }
          >
            👥 Manage Users
          </button>

          <button
            onClick={() =>
              (window.location.href = "/admin/products")
            }
          >
            🛍️ Manage Products
          </button>

          <button
            onClick={() =>
              (window.location.href = "/admin/orders")
            }
          >
            📦 Manage Orders
          </button>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;

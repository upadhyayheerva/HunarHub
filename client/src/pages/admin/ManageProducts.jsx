import { useEffect, useState } from "react";
import API from "../../api";
import "./ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/admin/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Unable to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product deleted successfully");

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to delete product"
      );
    }
  };

  if (loading) {
    return (
      <div className="admin-page-message">
        Loading products...
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
        <h1>Manage Products</h1>

        <p>
          View and manage all products listed on HunarHub.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="admin-empty">
          No products found.
        </div>
      ) : (
        <div className="admin-products-grid">
          {products.map((product) => (
            <div
              className="admin-product-card"
              key={product._id}
            >
              <div className="admin-product-image">
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="admin-product-info">
                <h2>{product.name}</h2>

                <p className="admin-product-category">
                  {product.category}
                </p>

                <p className="admin-product-price">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>

                <p>
                  <strong>Seller:</strong>{" "}
                  {product.entrepreneurId?.fullName ||
                    "Unknown"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {product.entrepreneurId?.email ||
                    "Not available"}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {product.location || "Not available"}
                </p>

                <button
                  className="delete-product-btn"
                  onClick={() =>
                    handleDelete(product._id)
                  }
                >
                  Delete Product
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
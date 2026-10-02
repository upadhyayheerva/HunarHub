import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "../../styles/auth.css";

function AddProduct() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    location: "",
    category: "",
    image: "",
  });

  // Load Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories");
        setCategories(res.data.categories || res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Upload Image
  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const data = new FormData();
  data.append("image", file);

  setLoading(true);

  try {
    const res = await API.post("/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Upload Response:", res.data);

    setForm((prev) => ({
      ...prev,
      image: res.data.image,
    }));

    alert("Image uploaded successfully!");
  } catch (error) {
    console.error("Upload Error:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Image upload failed");
  } finally {
    setLoading(false);
  }
};
  // Submit Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      alert("Please upload an image first.");
      return;
    }

    try {
      await API.post("/products", {
        entrepreneurId: user._id || user.id,
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        location: form.location,
        category: form.category,
        image: form.image,
      });

      alert("Product added successfully");

      navigate("/seller/my-products");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: "650px" }}>
        <div className="auth-logo">
          <h1>Add Product</h1>
          <p>Add authentic handmade products to HunarHub.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label>Product Name</label>
            <input
              name="name"
              placeholder="Handcrafted Rogan Art Wall Hanging"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe your handmade product..."
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              placeholder="2499"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="15"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Location</label>
            <input
              name="location"
              placeholder="Nirona, Kutch, Gujarat"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Product Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />

            {loading && (
              <p style={{ color: "#1e40af", marginTop: "8px" }}>
                Uploading image...
              </p>
            )}

            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                style={{
                  width: "180px",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginTop: "12px",
                  border: "1px solid #ddd",
                }}
              />
            )}
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
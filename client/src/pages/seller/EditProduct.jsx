import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    location: "",
    image: "",
  });

  useEffect(() => {
  const fetchData = async () => {
    try {
      const productRes = await API.get(`/products/${id}`);
      const categoryRes = await API.get("/categories");

      setCategories(categoryRes.data);

      setFormData({
        name: productRes.data.name,
        category: productRes.data.category || "",
        price: productRes.data.price,
        description: productRes.data.description,
        location: productRes.data.location,
        image: productRes.data.image,
      });
    } catch (error) {
      console.log(error);
      alert("Unable to load product.");
    }
  };

  fetchData();
}, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("location", formData.location);

      if (image) {
        data.append("image", image);
      }

      await API.put(`/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product updated successfully!");
      navigate("/seller/my-products");
    } catch (error) {
      console.log(error);
      alert("Error updating product.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          width: "420px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#1e3a8a",
            marginBottom: "25px",
          }}
        >
          Edit Product
        </h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          style={inputStyle}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
                {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          style={inputStyle}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows="4"
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
          style={inputStyle}
        />

        {formData.image && (
          <img
            src={formData.image}
            alt="Product"
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          />
        )}

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          style={{ marginBottom: "20px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            background: "#1e3a8a",
            color: "#fff",
            border: "none",
            padding: "14px",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "15px",
  boxSizing: "border-box",
};

export default EditProduct;
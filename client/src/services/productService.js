import API from "./api";

// Get all products
// Get all products
export const getProducts = async () => {
  const response = await API.get("/products");

  console.log("PRODUCTS FROM API:", response.data);

  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await API.get("/products/featured");
  return response.data;
};

// Add product
export const addProduct = async (formData) => {
  const response = await API.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update product
export const updateProduct = async (id, formData) => {
  const response = await API.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};
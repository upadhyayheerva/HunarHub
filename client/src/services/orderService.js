import API from "./api";

// Get logged-in user's orders
export const getOrders = async (userId) => {
  const res = await API.get(`/orders?userId=${userId}`);
  return res.data;
};

// Create order
export const createOrder = async (orderData) => {
  const res = await API.post("/orders", orderData);
  return res.data;
};
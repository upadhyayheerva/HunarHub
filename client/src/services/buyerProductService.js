import API from "./api";

export const getAllProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};
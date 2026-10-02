import API from "./api";

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?._id || user?.id;
};

// Get Wishlist
export const getWishlist = async () => {
  const userId = getUserId();

  if (!userId) {
    return { wishlist: [] };
  }

  const response = await API.get(`/wishlist?userId=${userId}`);
  return response.data;
};

// Add to Wishlist
export const addToWishlist = async (product) => {
  const response = await API.post("/wishlist", {
    userId: getUserId(),
    productId: product._id,
    name: product.name,
    image: product.image,
    price: product.price,
    category: product.category,
    location: product.location,
  });

  return response.data;
};

// Remove from Wishlist
export const removeFromWishlist = async (id) => {
  const response = await API.delete(`/wishlist/${id}`);
  return response.data;
};
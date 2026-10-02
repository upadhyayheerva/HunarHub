import API from "./api";

export const getDashboardStats = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const res = await API.get(
    `/dashboard?entrepreneurId=${user._id || user.id}`
  );

  return res.data;
};
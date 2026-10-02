import API from "./api";

export const getEntrepreneurs = async () => {
  const response = await API.get("/entrepreneurs");
  return response.data;
};
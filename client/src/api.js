import axios from "axios";

const API = axios.create({
  baseURL: "https://hunarhub-pbkg.onrender.com/api",
});

export default API;
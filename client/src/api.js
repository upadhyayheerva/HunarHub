import axios from "axios";

const API = axios.create({
  baseURL:"https://hunarhub-pbkg.onrender.com/"
});

export default API;
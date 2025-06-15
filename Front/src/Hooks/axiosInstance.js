import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/auth", // your backend URL
  withCredentials: true, // 👈 ensures cookies are sent automatically!
});

export default axiosInstance;
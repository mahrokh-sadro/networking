import axios from "axios";
import store from "../store";
// import

const api = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://adventure.land/api/",
});

export default api;

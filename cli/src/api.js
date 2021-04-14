import axios from "axios";

const api = axios.create({
  baseURL: "https://adventure.land",
  timeout: 1000,
  headers: {
    "x-requested-with": "XMLHttpRequest",
    Accept: "application/json, text/javascript, */*; q=0.01",
  },
});

export default api;

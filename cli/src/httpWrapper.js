import axios from "axios";

const httpWrapper = axios.create({
  baseURL: "https://adventure.land/api/",
});

export default httpWrapper;

import axios from "axios";

const axiosApiIntances = axios.create({
  baseURL: "https://my-json-server.typicode.com/billhikmah/json-database/",
});

export default axiosApiIntances;

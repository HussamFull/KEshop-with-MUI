
import axios from "axios";

const token = localStorage.getItem("userToken");
const AxiosProfileInstanse = axios.create({
  baseURL: `https://kashop1.runasp.net/api/`,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default AxiosProfileInstanse;
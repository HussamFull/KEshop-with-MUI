
import axios from "axios";

const token = localStorage.getItem("userToken");
const AxiosUserInstanse = axios.create({
  baseURL: `https://kashop1.runasp.net/api/Customer`,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default AxiosUserInstanse;

import axios from "axios";

const AxiosInstanse = axios.create({
  baseURL: `https://kashop1.runasp.net/api/Customer`,
});

export default AxiosInstanse;
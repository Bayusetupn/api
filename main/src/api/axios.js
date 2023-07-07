import { url } from "./url.js";

import axios from "axios";
const api = axios.create({
  baseURL: url,
});


export default api;
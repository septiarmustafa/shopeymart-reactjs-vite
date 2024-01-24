import axios from "axios";
import { BASE_URL } from "./baseUrl";
import SetupInterceptors from "./SetupInterceptor";

const http = axios.create({
  baseURL: BASE_URL,
});

SetupInterceptors(http);

export default http;

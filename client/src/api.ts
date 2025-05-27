import axios from "axios";
declare module "axios" {
  interface AxiosInstance {
    createListing(data: object): Promise<any>;
  }
}
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/booking/api",
  timeout: 10000,
});

api.createListing = (data: FormData) => api.post("/listings", data);

api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    console.log("Запрос к:", config.url, "с токеном:", !!token);
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  console.log("[API] Запрос:", {
    url: config.url,
    method: config.method,
    data: config.data
  })
  console.log("Отправка запроса на:", config.url, "с данными:", config.data)
  return config
})
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Ошибка API:", error.response?.status, error.message);
    if (error.response?.status === 401) {
      console.log("Обнаружена 401 ошибка - выполняем логаут");
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);
export default api;

import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://forum-api.dicoding.dev/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// sisipkan token sebelum request dikirim
apiClient.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("token"); // tetap pakai localStorage

    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;

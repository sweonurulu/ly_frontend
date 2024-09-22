// axios/httpConfig.js
import axios from "axios";
import Cookies from 'js-cookie'; // veya token'ı sakladığınız başka bir yer

const HTTP = axios.create({
  baseURL: "https://ly-backend-8gjq.onrender.com", 
  // https://ly-backend-8gjq.onrender.com
  // http://localhost:5000
  // onur ulu
  headers: {
    'Content-Type': 'application/json',
},
});

// Token'ı her istekle birlikte eklemek için interceptors kullanın
HTTP.interceptors.request.use(
(config) => {
    const token = Cookies.get('token'); // Veya token'ı nerede saklıyorsanız
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
}
);

export default HTTP;

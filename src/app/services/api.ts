import axios from "axios";
import Config from "../Config";


//Crear instancia de axios

const api = axios.create({
    baseURL: Config.API_URL,
    timeout: 5000,
});

//request interceptor

api.interceptors.request.use(
    (config) => {
        const newConfig = { ...config };
        newConfig.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_MDB_API_KEY}`;
        newConfig.headers.accept = "application/json";
        console.log("Making request to: ", newConfig.url);
        return newConfig;
    },
    (error) => {
        console.error("Error making request: ", error);
        return Promise.reject(error);
    }
);


// Response interceptor

api.interceptors.response.use(
    (response) =>response,
    (error) => {
        console.error("Error in response: ", error);
        return Promise.reject(error);      
    }
);

export default api;

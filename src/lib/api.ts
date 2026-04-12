import axios from "axios";
// import { useSelector } from "react-redux";
// import type { RootState } from "../global/store";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// api.interceptors.request.use(
//     (config) => {
//         const token = useSelector((state: RootState) => state.learnFlow.userToken)

//         if(token && config.headers) {
//             console.log(token,"here");
            
//             config.headers.Authorization = `Bearer ${token}`
//         }else{
//             console.log("no token");
            
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )

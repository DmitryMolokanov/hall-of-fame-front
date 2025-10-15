import axiosInstance from "@/config/axiosConfig";

export const boxersApi = {
    getAllBoxers: () => axiosInstance.get('/boxers')
}
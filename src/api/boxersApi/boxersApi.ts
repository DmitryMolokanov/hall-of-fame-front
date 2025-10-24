import axiosInstance from "@/config/axiosConfig";

export const boxersApi = {
    getAllBoxers: () => axiosInstance.get('/boxers'),
    deleteBoxer: (id: string) => axiosInstance.delete('/boxers', { data: { id } })
}
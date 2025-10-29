import axiosInstance from "@/config/axiosConfig";

export const boxersApi = {
    getAllBoxers: () => axiosInstance.get('/boxers'),

    getBoxers: (limit: number, offset: number) => axiosInstance.get(`/boxers?limit=${limit}&offset=${offset}`),

    getSearchBoxers: (searchValue: string) => axiosInstance.post('/boxers/search', { search: searchValue }),

    deleteBoxer: (id: string) => axiosInstance.delete('/boxers', { data: { id } })
}
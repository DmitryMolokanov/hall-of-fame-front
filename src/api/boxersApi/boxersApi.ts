import axiosInstance from "@/config/axiosConfig";

export const boxersApi = {

    getBoxers: (limit: number, offset: number, sortOrder: 'ASC' | 'DESC', sortBy: string,) => {
        const params = {
            limit,
            offset,
            sortOrder,
            sortBy
        }

        return axiosInstance.get('/boxers', { params })
    },

    getAllBoxers: () => axiosInstance.get('/boxers'),

    getBoxer: (id: string) => axiosInstance.get(`/boxers/${id}`),

    getSearchBoxers: (searchValue: string) => axiosInstance.post('/boxers/search', { search: searchValue }),

    deleteBoxer: (id: string) => axiosInstance.delete('/boxers', { data: { id } })
}
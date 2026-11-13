import axiosInstance from "@/config/axiosConfig";
import { BoxerTypes } from "@/types/boxerTypes";

type BoxerLink = Pick<BoxerTypes, 'name' | 'slug' | 'category'>
export interface BoxerProfileResponse {
    boxer: BoxerTypes
    prev: BoxerLink | null
    next: BoxerLink | null
}

export const boxersApi = {

    getBoxers: (limit: number, offset: number, sortOrder: 'ASC' | 'DESC', sortBy: string, category?: string) => {
        const params = {
            limit,
            offset,
            sortOrder,
            sortBy,
            category,
        }

        return axiosInstance.get('/boxers', { params })
    },

    getAllBoxers: () => axiosInstance.get('/boxers'),

    // profile page: the boxer and alphabetical neighbours in the same category
    getBoxerBySlug: (slug: string) => axiosInstance.get<BoxerProfileResponse>(`/boxers/by-slug/${encodeURIComponent(slug)}`),

    // number of boxers per category: [{ category, count }]
    getCategories: () => axiosInstance.get<{ category: string, count: number }[]>('/boxers/categories'),

    getSearchBoxers: (searchValue: string, category?: string) => axiosInstance.post('/boxers/search', { search: searchValue, category }),

    deleteBoxer: (id: string) => axiosInstance.delete('/boxers', { data: { id } })
}

import axiosInstance from "@/config/axiosConfig";
import { PersonProfileResponse, PersonTypes } from "@/types/personTypes";

export const peopleApi = {
    // a role has at most a few dozen people, so a list is loaded in one request
    getPeople: (role: string) =>
        axiosInstance.get<PersonTypes[]>('/people', { params: { role, limit: 100, offset: 0, sortBy: 'name', sortOrder: 'ASC' } }),

    getRoles: () => axiosInstance.get<{ role: string, count: number }[]>('/people/roles'),

    getPersonBySlug: (slug: string) => axiosInstance.get<PersonProfileResponse>(`/people/by-slug/${encodeURIComponent(slug)}`),
}

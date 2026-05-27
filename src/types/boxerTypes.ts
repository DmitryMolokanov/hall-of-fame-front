export interface BoxerTypes {
    id: string
    name: string
    biography: string
    born: string
    died: string,
    bouts: string,
    won: string,
    lost: string,
    drew: string,
    nc: string,
    kos: string,
    induction: string,
    avatarImg: string | null,
    img: string | null
}

export type SortBoxerType = 'name' | 'born' | 'induction' | 'bouts' | 'won'
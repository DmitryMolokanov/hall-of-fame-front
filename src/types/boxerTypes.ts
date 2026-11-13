export interface BoxerTypes {
    id: string
    name: string
    biography: string
    born: string
    died: string,
    // record fields are null when the fight record is unknown (bare-knuckle era)
    bouts: string | null,
    won: string | null,
    lost: string | null,
    drew: string,
    nc: string,
    kos: string | null,
    induction: string,
    avatarImg: string | null,
    img: string | null,
    category: string | null,
    slug: string | null,
    bioSourceUrl: string | null,
    imageAuthor: string | null,
    imageLicense: string | null,
    imageLicenseUrl: string | null,
    imageSourceUrl: string | null
}

export type SortBoxerType = 'name' | 'born' | 'induction' | 'bouts' | 'won'
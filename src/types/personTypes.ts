// "Beyond the Ring": Hall of Fame inductees who are not boxers
export interface PersonTypes {
    id: string
    slug: string
    name: string
    role: string
    biography: string
    bioSourceUrl: string | null
    born: string | null
    died: string | null
    induction: number | null
    avatarImg: string | null
    img: string | null
    imageAuthor: string | null
    imageLicense: string | null
    imageLicenseUrl: string | null
    imageSourceUrl: string | null
}

export type PersonLink = Pick<PersonTypes, 'name' | 'slug' | 'role'>

export interface PersonProfileResponse {
    person: PersonTypes
    prev: PersonLink | null
    next: PersonLink | null
}

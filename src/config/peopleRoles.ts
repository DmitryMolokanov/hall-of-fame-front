import { ImageCreditData } from '@/components/ImageCredit/ImageCredit'

// "Beyond the Ring" roles. slug matches the `role` stored for each person on the backend.
export type PersonRoleSlug = 'trainer' | 'promoter' | 'referee'

export interface PersonRole {
    slug: PersonRoleSlug
    path: string // URL part: /beyond-the-ring/:path
    title: string
    single: string // one person of this role, for profile pills
    description: string
    // position: CSS object-position, to keep the subject in a portrait card when the photo is landscape
    cover?: { src: string, alt: string, credit: ImageCreditData, position?: string }
}

export const PERSON_ROLES: PersonRole[] = [
    {
        slug: 'trainer',
        path: 'trainers',
        title: 'Trainers & Cornermen',
        single: 'Trainer',
        description: "The voices in the corner: from Ray Arcel and Cus D'Amato to Angelo Dundee and Freddie Roach.",
        cover: {
            src: '/images/commons/people/img/freddie-roach.jpg',
            alt: 'Freddie Roach',
            credit: {
                imageAuthor: 'Frederick Manligas Nacino',
                imageLicense: 'CC BY-SA 3.0',
                imageLicenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
                imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Freddie_Roach.jpg',
            },
        },
    },
    {
        slug: 'promoter',
        path: 'promoters',
        title: 'Promoters & Managers',
        single: 'Promoter / Manager',
        description: 'The deal-makers who built the big nights: Tex Rickard, Mike Jacobs, Don King, Bob Arum.',
        cover: {
            src: '/images/commons/people/img/don-king.jpg',
            alt: 'Don King',
            credit: {
                imageAuthor: 'Frederick Johnson',
                imageLicense: 'CC BY-SA 4.0',
                imageLicenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
                imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Don_King_by_Frederick_Johnson_(cropped).jpg',
            },
        },
    },
    {
        slug: 'referee',
        path: 'referees',
        title: 'Referees & Judges',
        single: 'Referee / Judge',
        description: 'The third man in the ring and the scorers at ringside: Mercante, Mills Lane, Richard Steele, Harold Lederman.',
        cover: {
            // Ali vs. Frazier, 1971: Arthur Mercante steps in after Frazier's knockdown
            src: '/images/commons/people/img/arthur-mercante-sr.jpg',
            alt: 'Referee Arthur Mercante at Ali vs. Frazier, 1971',
            position: '22% center',
            credit: {
                imageAuthor: 'Associated Press',
                imageLicense: 'Public domain',
                imageLicenseUrl: null,
                imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Joe_Frazier_standing_over_Muhammad_Ali.jpg',
            },
        },
    },
]

export const findRoleByPath = (path: string | undefined) => PERSON_ROLES.find((r) => r.path === path)
export const findRoleBySlug = (slug: string | undefined) => PERSON_ROLES.find((r) => r.slug === slug)

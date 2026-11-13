import { ImageCreditData } from '@/components/ImageCredit/ImageCredit'

// IBHOF boxer categories (current scheme, by the date of the last bout).
// slug matches the `category` value stored for each boxer on the backend.
export type BoxerCategorySlug = 'modern' | 'late-era' | 'early-era' | 'pioneer' | 'women-modern' | 'women-trailblazer'

export interface BoxerCategory {
    slug: BoxerCategorySlug
    group: 'men' | 'women'
    title: string
    period: string
    description: string
    cover: { src: string, alt: string, credit: ImageCreditData }
}

const PD = { imageLicense: 'Public domain', imageLicenseUrl: null }

export const BOXER_CATEGORIES: BoxerCategory[] = [
    {
        slug: 'modern',
        group: 'men',
        title: 'Modern',
        period: 'Last bout in 1989 or later',
        description: 'From Tyson and Holyfield to Pacquiao and Klitschko.',
        cover: {
            src: '/images/commons/img/lennox-lewis.jpg',
            alt: 'Lennox Lewis',
            credit: {
                imageAuthor: '-nikkon-',
                imageLicense: 'CC BY-SA 2.0',
                imageLicenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
                imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Lenox_Lewis_2010_cropped.jpg',
            },
        },
    },
    {
        slug: 'late-era',
        group: 'men',
        title: 'Late Era',
        period: 'Last bout 1943–1988',
        description: 'The age of Ali, Sugar Ray Robinson and Marciano.',
        cover: {
            src: '/images/commons/img/ali.jpg',
            alt: 'Muhammad Ali',
            credit: { ...PD, imageAuthor: 'Ira Rosenberg', imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Muhammad_Ali_NYWTS.jpg' },
        },
    },
    {
        slug: 'early-era',
        group: 'men',
        title: 'Early Era',
        period: 'Fought 1893–1942',
        description: 'Gloved boxing comes of age: Dempsey, Johnson, Langford.',
        cover: {
            src: '/images/commons/img/jack-dempsey.jpg',
            alt: 'Jack Dempsey',
            credit: { ...PD, imageAuthor: 'Bain News Service', imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Jack_Dempsey_3.jpg' },
        },
    },
    {
        slug: 'pioneer',
        group: 'men',
        title: 'Pioneer',
        period: 'Last bout in 1892 or earlier',
        description: 'Bare-knuckle champions from Broughton to Sullivan.',
        cover: {
            src: '/images/commons/img/john-l-sullivan.jpg',
            alt: 'John L. Sullivan',
            credit: { ...PD, imageAuthor: 'Popular Graphic Arts', imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:John_L._Sullivan_LCCN2003673070.jpg' },
        },
    },
    {
        slug: 'women-modern',
        group: 'women',
        title: "Women's Modern",
        period: 'Inducted since 2020',
        description: "World champions of the modern women's game: Ali, Martin, Rijker, Halmich.",
        cover: {
            src: '/images/commons/img/laila-ali.jpg',
            alt: 'Laila Ali',
            credit: {
                imageAuthor: 'Gage Skidmore',
                imageLicense: 'CC BY-SA 3.0',
                imageLicenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
                imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Laila_Ali_by_Gage_Skidmore.jpg',
            },
        },
    },
    {
        slug: 'women-trailblazer',
        group: 'women',
        title: "Women's Trailblazer",
        period: "Pioneers of women's boxing",
        description: 'They fought for the right to box: Buttrick, Davis, Tonawanda, Trimiar.',
        // no free photos of the inductees exist: a 1912 bout between two women stands in for the era
        cover: {
            src: '/images/commons/img/women-boxing-1912.jpg',
            alt: 'Mrs. Edwards and Fräulein Kussin boxing, 1912',
            credit: {
                ...PD,
                imageAuthor: 'Bain News Service, 1912',
                imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Mrs._Edwards_%26_Frl._Kussin_(boxing)_LCCN2014690162.jpg',
            },
        },
    },
]

export const findCategory = (slug: string | undefined) => BOXER_CATEGORIES.find((c) => c.slug === slug)

import { FC } from 'react'

export interface ImageCreditData {
    imageAuthor: string | null
    imageLicense: string | null
    imageLicenseUrl: string | null
    imageSourceUrl: string | null
}

interface ImageCreditProps {
    credit: ImageCreditData
    className?: string
}

// Photo attribution in the form required by CC BY / CC BY-SA: author, license (with link), source.
export const ImageCredit: FC<ImageCreditProps> = ({ credit, className }) => {
    const { imageAuthor, imageLicense, imageLicenseUrl, imageSourceUrl } = credit
    const isWikimedia = imageSourceUrl?.includes('wikimedia.org')

    const plainText = ['Photo: ' + (imageAuthor || 'unknown author'), imageLicense, imageSourceUrl && (isWikimedia ? 'Wikimedia Commons' : 'source')]
        .filter(Boolean).join(' · ')

    return (
        <figcaption className={className} title={plainText}>
            Photo: {imageAuthor || 'unknown author'}
            {' · '}
            {imageLicenseUrl
                ? <a href={imageLicenseUrl} target="_blank" rel="noopener noreferrer license">{imageLicense}</a>
                : imageLicense}
            {imageSourceUrl && <>
                {' · '}
                <a href={imageSourceUrl} target="_blank" rel="noopener noreferrer">
                    {isWikimedia ? 'Wikimedia Commons' : 'source'}
                </a>
            </>}
        </figcaption>
    )
}

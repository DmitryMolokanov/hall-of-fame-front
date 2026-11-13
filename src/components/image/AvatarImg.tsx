import { FC } from 'react'
import cls from './AvatarImg.module.scss'
import { PhotoPlaceholder } from './PhotoPlaceholder'

interface AvatarImgProps {
    img: string | null
    name: string
}

const AvatarImg: FC<AvatarImgProps> = ({ img, name }) => {
    return (
        img
            ? <div className={cls.avatarImgContainer}>
                <img src={img} alt={name} loading='lazy' />
            </div>
            : <PhotoPlaceholder name={name} variant="avatar" />
    )
};

export default AvatarImg

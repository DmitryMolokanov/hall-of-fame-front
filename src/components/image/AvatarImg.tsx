import React, { FC } from 'react'
import cls from './AvatarImg.module.scss'

interface AvatarImgProps {
    img: string | null
}

const AvatarImg: FC<AvatarImgProps> = ({ img }) => {
    return (
        img
            ? <div className={cls.avatarImgContainer}>
                <img src={img} alt="avatar" />
            </div>
            : <div className={cls.avatarImgContainerEmpty}>
            </div>
    )
};

export default AvatarImg

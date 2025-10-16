import { FC } from "react";
import cls from './Buttons.module.scss'
import classNames from "classnames";


export type btnAnimation = 'leftSideMove'

interface ButtonProps {
    label: string,
    onClick: () => void
    icon?: string,
    imgAnimation?: btnAnimation
}

export const Button: FC<ButtonProps> = (props) => {

    const {
        label,
        icon,
        onClick,
        imgAnimation
    } = props

    const mode = [
        imgAnimation && cls[imgAnimation],
    ]

    return (
        <button
            className={classNames(cls.btn, [mode])}
            onClick={onClick}
        >
            <img src={icon} alt="button-img" />
            <span>{label}</span>
        </button>
    )
};



import { FC } from "react";
import cls from './Buttons.module.scss'
import classNames from "classnames";


export type btnAnimation = 'leftSideMove'
export type btnVariant = 'success' | 'danger'

interface ButtonProps {
    label: string,
    onClick: () => void
    variant?: btnVariant
    icon?: string,
    imgAnimation?: btnAnimation
}

export const Button: FC<ButtonProps> = (props) => {

    const {
        label,
        variant,
        icon,
        onClick,
        imgAnimation
    } = props

    const mode = [
        variant && cls[variant],
        imgAnimation && cls[imgAnimation],
    ]

    return (
        <button
            className={classNames(cls.btn, [mode])}
            onClick={onClick}
        >
            {icon && <img src={icon} alt="button-img" />}
            <span>{label}</span>
        </button>
    )
};



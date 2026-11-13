import { FC } from "react";
import cls from './Buttons.module.scss'
import classNames from "classnames";


export type btnAnimation = 'leftSideMove' | 'rightSideMove'
export type btnVariant = 'success' | 'danger'
export type btnIconPosition = 'left' | 'right'

interface ButtonProps {
    label: string,
    onClick: () => void
    variant?: btnVariant
    icon?: string,
    iconPosition?: btnIconPosition
    imgAnimation?: btnAnimation
}

export const Button: FC<ButtonProps> = (props) => {

    const {
        label,
        variant,
        icon,
        iconPosition = 'left',
        onClick,
        imgAnimation
    } = props

    const mode = [
        variant && cls[variant],
        imgAnimation && cls[imgAnimation],
        !icon && cls.noIcon,
        icon && iconPosition === 'right' && cls.iconRight,
    ]

    return (
        <button
            className={classNames(cls.btn, [mode])}
            onClick={onClick}
        >
            {icon && <img src={icon} alt="" aria-hidden="true" />}
            <span>{label}</span>
        </button>
    )
};

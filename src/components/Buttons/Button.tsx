import { FC } from "react";
import cls from './Buttons.module.scss'
import classNames from "classnames";


interface ButtonProps {
    label: string,
    icon: string,
    onClick: () => void
}

export const Button: FC<ButtonProps> = (props) => {

    const { label, icon, onClick } = props


    return (
        <button
            className={classNames(cls.btn,)}
            onClick={onClick}
        >
            <img src={icon} alt="button-img" />
            <span>{label}</span>
        </button>
    )
};



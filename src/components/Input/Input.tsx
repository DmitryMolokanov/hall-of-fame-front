import React, { FC } from 'react'
import cls from './Input.module.scss'

interface InputProps {
    type: string
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = (props) => {

    const {
        type,
        placeholder,
        value,
        onChange
    } = props

    return (
        <input
            type={type}
            className={cls.input}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
};

export default Input

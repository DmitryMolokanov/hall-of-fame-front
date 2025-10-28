import React, { FC } from 'react'

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
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
};

export default Input

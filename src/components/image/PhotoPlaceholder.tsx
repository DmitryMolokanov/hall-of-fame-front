import { FC } from 'react'
import classNames from 'classnames'
import cls from './PhotoPlaceholder.module.scss'

// "Ted "Kid" Lewis" -> "TL", "Arturo Cuyo Hernández" -> "AH", "Cus D'Amato" -> "CD"
export const initialsOf = (name: string) => {
    const words = name
        .replace(/"[^"]*"|\([^)]*\)/g, ' ') // drop nicknames in quotes / brackets
        .split(/\s+/)
        .filter((w) => /^\p{L}/u.test(w) && !/^(jr|sr)\.?$/i.test(w))
    if (!words.length) return '?'
    const first = words[0][0]
    const last = words.length > 1 ? words[words.length - 1][0] : ''
    return (first + last).toUpperCase()
}

interface PhotoPlaceholderProps {
    name: string
    variant: 'card' | 'avatar'
    className?: string
}

// Stand-in for people without a free photo. Colors come from the theme variables,
// so it adapts to the light and dark theme on its own.
export const PhotoPlaceholder: FC<PhotoPlaceholderProps> = ({ name, variant, className }) => (
    <div
        className={classNames(cls.placeholder, cls[variant], className)}
        role="img"
        aria-label={`${name}: no free photo yet`}
    >
        <span className={cls.initials} aria-hidden="true">{initialsOf(name)}</span>
        {variant === 'card' && <span className={cls.note} aria-hidden="true">No free photo yet</span>}
    </div>
)

import { BoxerTypes } from '@/types/boxerTypes'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Dates are stored as "YYYY-MM-DD", "YYYY-MM" or "YYYY" (precision of the source)
export const formatDate = (value: string | null) => {
    if (!value) return '—'
    const [y, m, d] = value.split('-')
    if (!m) return y
    const month = MONTHS[+m - 1]
    return d ? `${month} ${+d}, ${y}` : `${month} ${y}`
}

// Age at death in Wikipedia style: "aged 66", or "aged 85–86" when only the years are known
export const ageAtDeath = (born: string | null, died: string | null) => {
    if (!born || !died) return null
    const [by, bm, bd] = born.split('-').map(Number)
    const [dy, dm, dd] = died.split('-').map(Number)
    if (!by || !dy) return null
    if (bm && bd && dm && dd) {
        const hadBirthday = dm > bm || (dm === bm && dd >= bd)
        return `aged ${dy - by - (hadBirthday ? 0 : 1)}`
    }
    if (bm && dm && bm !== dm) {
        return `aged ${dy - by - (dm > bm ? 0 : 1)}`
    }
    return `aged ${dy - by - 1}–${dy - by}`
}

export const lifeYears = (born: string | null, died: string | null) => {
    const b = born?.slice(0, 4)
    const d = died?.slice(0, 4)
    if (b && d) return `${b}–${d}`
    if (b) return `Born ${b}`
    return ''
}

// KO rate thresholds for the style tag (share of wins by knockout)
const KNOCKOUT_ARTIST = 70
const POINTS_FIGHTER = 30

export const getRecord = (boxer: BoxerTypes) => {
    if (boxer.won == null || boxer.lost == null) return null
    const won = +boxer.won
    const lost = +boxer.lost
    const drew = +(boxer.drew ?? 0)
    const nc = +(boxer.nc ?? 0)
    const kos = boxer.kos != null ? +boxer.kos : null
    const bouts = boxer.bouts != null ? +boxer.bouts : won + lost + drew + nc
    const koRate = kos != null && won > 0 ? Math.round((kos / won) * 100) : null
    const style = koRate == null ? null
        : koRate >= KNOCKOUT_ARTIST ? 'Knockout artist'
            : koRate < POINTS_FIGHTER ? 'Points fighter'
                : null
    return { won, lost, drew, nc, kos, bouts, koRate, style, points: Math.max(won - (kos ?? 0), 0) }
}

import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import cls from './BoxerInfoPage.module.scss'
import { boxersApi, BoxerProfileResponse } from '@/api/boxersApi/boxersApi'
import { findCategory } from '@/config/boxerCategories'
import { ImageCredit } from '@/components/ImageCredit/ImageCredit'
import { PhotoPlaceholder } from '@/components/image/PhotoPlaceholder'
import { Button } from '@/components/Buttons/Button'
import arrowLeft from '@/assets/icons/common/arrow-left.svg'
import { ageAtDeath, formatDate, getRecord, lifeYears } from './utils/boxerRecord'

// Profile page: /boxers/:category/:slug (rendered over the category list, which stays mounted)
const BoxerInfoPage = () => {
    const { category, slug } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState<BoxerProfileResponse | null>(null)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if (!slug) return
        let cancelled = false
        setData(null)
        setNotFound(false)
        boxersApi.getBoxerBySlug(slug)
            .then(({ data }) => { if (!cancelled) setData(data) })
            .catch(() => { if (!cancelled) setNotFound(true) })
        // braces matter: newer Chromium returns a Promise from scrollTo, React would call it as a cleanup
        window.scrollTo(0, 0)
        return () => { cancelled = true }
    }, [slug])

    const backToList = () => navigate(`/boxers/${category}`)

    if (notFound) return <Navigate to={`/boxers/${category}`} replace />
    if (!data) return <div className={cls.loading}>Loading…</div>

    const { boxer, prev, next } = data
    // a shared link may point to the wrong category: send it to the right one
    if (boxer.category && boxer.category !== category) {
        return <Navigate to={`/boxers/${boxer.category}/${boxer.slug}`} replace />
    }

    return <BoxerProfile boxer={boxer} prev={prev} next={next} onBack={backToList} />
}

interface BoxerProfileProps extends BoxerProfileResponse {
    onBack: () => void
}

const BoxerProfile = ({ boxer, prev, next, onBack }: BoxerProfileProps) => {
    const category = findCategory(boxer.category ?? undefined)
    const record = getRecord(boxer)
    const paragraphs = boxer.biography.split('<br>').filter(Boolean)

    return (
        <article className={cls.page}>
            <nav className={cls.topBar} aria-label="Breadcrumbs">
                <Button label='Back' icon={arrowLeft} imgAnimation='leftSideMove' onClick={onBack} />
                <ol className={cls.crumbs}>
                    <li><Link to="/boxers">Boxers</Link></li>
                    {category && <li><Link to={`/boxers/${category.slug}`}>{category.title}</Link></li>}
                    <li aria-current="page">{boxer.name}</li>
                </ol>
            </nav>

            <div className={cls.card}>
                {/* ---------- header: identity on the left, record on the right ---------- */}
                <header className={cls.header}>
                    <div className={cls.identity}>
                        <p className={cls.metaLine}>
                            {category && <Link to={`/boxers/${category.slug}`} className={cls.categoryPill}>{category.title}</Link>}
                            <span>{lifeYears(boxer.born, boxer.died)}</span>
                            <span className={cls.metaDot}>·</span>
                            <span>Inducted {boxer.induction}</span>
                        </p>
                        <h1 className={cls.name}>{boxer.name}</h1>
                    </div>

                    {record ? (
                        <dl className={cls.stats}>
                            <div className={cls.stat}>
                                <dt>W-L-D</dt>
                                <dd>{record.won}-{record.lost}-{record.drew}</dd>
                            </div>
                            <div className={cls.stat}>
                                <dt>KO</dt>
                                <dd className={cls.accent}>{record.kos ?? '—'}</dd>
                            </div>
                            <div className={`${cls.stat} ${cls.statKoRate}`}>
                                <dt>KO rate</dt>
                                <dd className={cls.accent}>{record.koRate != null ? `${record.koRate}%` : '—'}</dd>
                                {record.style && <span className={cls.styleTag}>{record.style}</span>}
                            </div>
                            <div className={cls.stat}>
                                <dt>Bouts</dt>
                                <dd>{record.bouts}</dd>
                            </div>
                        </dl>
                    ) : (
                        <p className={cls.noRecord}>
                            {boxer.category === 'pioneer' ? 'Bare-knuckle era: fight record not documented' : 'Fight record not documented'}
                        </p>
                    )}
                </header>

                {record && <RecordBar record={record} />}

                {/* ---------- body: photo and facts | biography ---------- */}
                <div className={cls.body}>
                    <aside className={cls.side}>
                        {boxer.img ? (
                            <figure className={cls.photo}>
                                <img src={boxer.img} alt={boxer.name} />
                                {boxer.imageLicense && <ImageCredit credit={boxer} className={cls.photoCredit} />}
                            </figure>
                        ) : (
                            <PhotoPlaceholder name={boxer.name} variant="card" />
                        )}

                        <dl className={cls.facts}>
                            <div><dt>Born</dt><dd>{formatDate(boxer.born)}</dd></div>
                            {boxer.died && (
                                <div>
                                    <dt>Died</dt>
                                    <dd>
                                        {formatDate(boxer.died)}
                                        {ageAtDeath(boxer.born, boxer.died) && <span className={cls.age}> ({ageAtDeath(boxer.born, boxer.died)})</span>}
                                    </dd>
                                </div>
                            )}
                            <div><dt>Inducted</dt><dd>{boxer.induction}</dd></div>
                            {category && <div><dt>Category</dt><dd>{category.title}</dd></div>}
                        </dl>
                    </aside>

                    <div className={cls.bio}>
                        {paragraphs.map((p, i) => (
                            <p key={i} className={i === 0 ? cls.lead : undefined}>{p}</p>
                        ))}
                        {boxer.bioSourceUrl && (
                            <p className={cls.bioSource}>
                                Biography:{' '}
                                <a href={boxer.bioSourceUrl} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                                {' · '}
                                <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer license">CC BY-SA 4.0</a>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <nav className={cls.pager} aria-label="Other boxers in this category">
                {prev ? <Link to={`/boxers/${prev.category}/${prev.slug}`} className={cls.pagerLink}>← {prev.name}</Link> : <span />}
                {next ? <Link to={`/boxers/${next.category}/${next.slug}`} className={cls.pagerLink}>{next.name} →</Link> : <span />}
            </nav>
        </article>
    )
}

const RecordBar = ({ record }: { record: NonNullable<ReturnType<typeof getRecord>> }) => {
    // the bar splits wins into KO / points; the legend shows total wins and the KO share of them
    const segments = [
        { key: 'ko', value: record.kos ?? 0, className: cls.segKo },
        { key: 'points', value: record.points, className: cls.segPoints },
        { key: 'lost', value: record.lost, className: cls.segLost },
        { key: 'drew', value: record.drew, className: cls.segDrew },
        { key: 'nc', value: record.nc, className: cls.segNc },
    ].filter((s) => s.value > 0)
    const total = segments.reduce((sum, s) => sum + s.value, 0) || 1

    const others = [
        { key: 'lost', label: 'Lost', value: record.lost, className: cls.segLost },
        { key: 'drew', label: 'Drew', value: record.drew, className: cls.segDrew },
        { key: 'nc', label: 'No contest', value: record.nc, className: cls.segNc },
    ].filter((s) => s.value > 0)

    const koShare = record.kos != null && record.koRate != null
        ? ` · ${record.kos} by KO (${record.koRate}%)`
        : ''

    return (
        <div className={cls.recordBar}>
            <div className={cls.bar} role="img" aria-label={`Won ${record.won}${koShare}, ${others.map((s) => `${s.label} ${s.value}`).join(', ')}`}>
                {segments.map((s) => (
                    <div key={s.key} className={s.className} style={{ width: `${(s.value / total) * 100}%` }} />
                ))}
            </div>
            <ul className={cls.legend}>
                {record.won > 0 && (
                    <li><span className={`${cls.swatch} ${cls.swatchWon}`} />Won <b>{record.won}</b>{koShare}</li>
                )}
                {others.map((s) => (
                    <li key={s.key}><span className={`${cls.swatch} ${s.className}`} />{s.label} <b>{s.value}</b></li>
                ))}
            </ul>
        </div>
    )
}

export default BoxerInfoPage

import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
// same profile look as a boxer's card
import cls from '@/pages/Boxer/BoxerInfoPage/BoxerInfoPage.module.scss'
import { peopleApi } from '@/api/peopleApi/peopleApi'
import { PersonProfileResponse } from '@/types/personTypes'
import { findRoleByPath, findRoleBySlug } from '@/config/peopleRoles'
import { ImageCredit } from '@/components/ImageCredit/ImageCredit'
import { PhotoPlaceholder } from '@/components/image/PhotoPlaceholder'
import { Button } from '@/components/Buttons/Button'
import arrowLeft from '@/assets/icons/common/arrow-left.svg'
import { ageAtDeath, formatDate, lifeYears } from '@/pages/Boxer/BoxerInfoPage/utils/boxerRecord'

// /beyond-the-ring/:role/:slug (rendered over the role list, which stays mounted)
const PersonPage = () => {
    const { role: rolePath, slug } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState<PersonProfileResponse | null>(null)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if (!slug) return
        let cancelled = false
        setData(null)
        setNotFound(false)
        peopleApi.getPersonBySlug(slug)
            .then(({ data }) => { if (!cancelled) setData(data) })
            .catch(() => { if (!cancelled) setNotFound(true) })
        window.scrollTo(0, 0)
        return () => { cancelled = true }
    }, [slug])

    if (notFound) return <Navigate to={`/beyond-the-ring/${rolePath}`} replace />
    if (!data) return <div className={cls.loading}>Loading…</div>

    const { person, prev, next } = data
    const role = findRoleBySlug(person.role)
    if (role && role.path !== rolePath) return <Navigate to={`/beyond-the-ring/${role.path}/${person.slug}`} replace />
    const listPath = `/beyond-the-ring/${findRoleByPath(rolePath)?.path ?? ''}`
    const paragraphs = person.biography.split('<br>').filter(Boolean)
    const age = ageAtDeath(person.born, person.died)

    return (
        <article className={cls.page}>
            <nav className={cls.topBar} aria-label="Breadcrumbs">
                <Button label='Back' icon={arrowLeft} imgAnimation='leftSideMove' onClick={() => navigate(listPath)} />
                <ol className={cls.crumbs}>
                    <li><Link to="/beyond-the-ring">Beyond the Ring</Link></li>
                    {role && <li><Link to={listPath}>{role.title}</Link></li>}
                    <li aria-current="page">{person.name}</li>
                </ol>
            </nav>

            <div className={cls.card}>
                <header className={cls.header}>
                    <div className={cls.identity}>
                        <p className={cls.metaLine}>
                            {role && <Link to={listPath} className={cls.categoryPill}>{role.single}</Link>}
                            {lifeYears(person.born, person.died) && <span>{lifeYears(person.born, person.died)}</span>}
                            {person.induction && <><span className={cls.metaDot}>·</span><span>Inducted {person.induction}</span></>}
                        </p>
                        <h1 className={cls.name}>{person.name}</h1>
                    </div>
                </header>

                <div className={cls.body}>
                    <aside className={cls.side}>
                        {person.img ? (
                            <figure className={cls.photo}>
                                <img src={person.img} alt={person.name} />
                                {person.imageLicense && <ImageCredit credit={person} className={cls.photoCredit} />}
                            </figure>
                        ) : (
                            <PhotoPlaceholder name={person.name} variant="card" />
                        )}
                        <dl className={cls.facts}>
                            <div><dt>Born</dt><dd>{formatDate(person.born)}</dd></div>
                            {person.died && (
                                <div><dt>Died</dt><dd>{formatDate(person.died)}{age && <span className={cls.age}> ({age})</span>}</dd></div>
                            )}
                            {person.induction && <div><dt>Inducted</dt><dd>{person.induction}</dd></div>}
                            {role && <div><dt>Role</dt><dd>{role.single}</dd></div>}
                        </dl>
                    </aside>

                    <div className={cls.bio}>
                        {paragraphs.map((p, i) => <p key={i} className={i === 0 ? cls.lead : undefined}>{p}</p>)}
                        {person.bioSourceUrl && (
                            // short profiles (no Wikipedia article) are composed from Wikidata, which is CC0
                            person.bioSourceUrl.includes('wikidata.org') ? (
                                <p className={cls.bioSource}>
                                    Data: <a href={person.bioSourceUrl} target="_blank" rel="noopener noreferrer">Wikidata</a>
                                    {' · '}
                                    <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer license">CC0</a>
                                </p>
                            ) : (
                                <p className={cls.bioSource}>
                                    Biography: <a href={person.bioSourceUrl} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                                    {' · '}
                                    <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer license">CC BY-SA 4.0</a>
                                </p>
                            )
                        )}
                    </div>
                </div>
            </div>

            <nav className={cls.pager} aria-label="Other people in this role">
                {prev ? <Link to={`${listPath}/${prev.slug}`} className={cls.pagerLink}>← {prev.name}</Link> : <span />}
                {next ? <Link to={`${listPath}/${next.slug}`} className={cls.pagerLink}>{next.name} →</Link> : <span />}
            </nav>
        </article>
    )
}

export default PersonPage

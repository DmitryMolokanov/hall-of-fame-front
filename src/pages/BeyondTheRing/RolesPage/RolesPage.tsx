import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// same photo-card look as the Boxers categories page
import cls from '@/pages/Boxer/BoxerCategoriesPage/BoxerCategoriesPage.module.scss'
import { PERSON_ROLES } from '@/config/peopleRoles'
import { peopleApi } from '@/api/peopleApi/peopleApi'
import { ImageCredit } from '@/components/ImageCredit/ImageCredit'
import arrowRight from '@assets/icons/common/arrow-right.svg'

const peopleWord = (n: number) => (n === 1 ? 'inductee' : 'inductees')

// /beyond-the-ring: one photo card per role
const RolesPage = () => {
    const [counts, setCounts] = useState<Record<string, number>>({})

    useEffect(() => {
        peopleApi.getRoles()
            .then(({ data }) => setCounts(Object.fromEntries(data.map((r) => [r.role, r.count]))))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className={cls.page}>
            <header className={cls.header}>
                <h1 className={cls.title}>Beyond the Ring</h1>
                <p className={cls.subtitle}>
                    The Hall of Fame also honors the people who made the fights happen: the trainers in the corner,
                    the promoters and managers who put the great nights together, and the referees and judges who kept them fair.
                </p>
            </header>

            <div className={cls.grid}>
                {PERSON_ROLES.map((role) => (
                    <figure key={role.slug} className={cls.card}>
                        <Link to={`/beyond-the-ring/${role.path}`} className={cls.cardLink} aria-label={role.title}>
                            {role.cover && (
                                <img
                                    src={role.cover.src}
                                    alt={role.cover.alt}
                                    className={cls.cardImage}
                                    style={role.cover.position ? { objectPosition: role.cover.position } : undefined}
                                    loading="lazy"
                                />
                            )}
                            <div className={cls.cardOverlay} />
                            <div className={cls.cardContent}>
                                <h3 className={cls.cardTitle}>{role.title}</h3>
                                <p className={cls.cardDescription}>{role.description}</p>
                                <span className={cls.cardFooter}>
                                    {counts[role.slug] != null ? `${counts[role.slug]} ${peopleWord(counts[role.slug])}` : ' '}
                                    <img src={arrowRight} alt="" aria-hidden="true" className={cls.cardArrow} />
                                </span>
                            </div>
                        </Link>
                        {role.cover && <ImageCredit credit={role.cover.credit} className={cls.cardCredit} />}
                    </figure>
                ))}
            </div>
        </div>
    )
}

export default RolesPage

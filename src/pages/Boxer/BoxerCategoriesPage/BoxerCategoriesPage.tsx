import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cls from './BoxerCategoriesPage.module.scss'
import { BOXER_CATEGORIES } from '@/config/boxerCategories'
import { boxersApi } from '@/api/boxersApi/boxersApi'
import { ImageCredit } from '@/components/ImageCredit/ImageCredit'
import arrowRight from '@assets/icons/common/arrow-right.svg'

const boxersWord = (n: number) => (n === 1 ? 'boxer' : 'boxers')

const GROUPS = [
    { id: 'men', title: 'Men' },
    { id: 'women', title: 'Women' },
] as const

// Entry point of the Boxers section: one photo card per IBHOF category
const BoxerCategoriesPage = () => {
    const [counts, setCounts] = useState<Record<string, number>>({})

    useEffect(() => {
        boxersApi.getCategories()
            .then(({ data }) => setCounts(Object.fromEntries(data.map((c) => [c.category, c.count]))))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className={cls.page}>
            <header className={cls.header}>
                <h1 className={cls.title}>Hall of Fame Boxers</h1>
                <p className={cls.subtitle}>
                    Inductees are grouped the way the Hall elects them: men by the era of their last professional bout, women in two categories since the class of 2020.
                </p>
            </header>

            {GROUPS.map((group) => (
            <section key={group.id} className={cls.group} aria-labelledby={`group-${group.id}`}>
            <h2 id={`group-${group.id}`} className={cls.groupTitle}>{group.title}</h2>
            <div className={cls.grid}>
                {BOXER_CATEGORIES.filter((c) => c.group === group.id).map((category) => (
                    <figure key={category.slug} className={cls.card}>
                        <Link to={`/boxers/${category.slug}`} className={cls.cardLink} aria-label={`${category.title}: ${category.period}`}>
                            <img src={category.cover.src} alt={category.cover.alt} className={cls.cardImage} loading="lazy" />
                            <div className={cls.cardOverlay} />
                            <div className={cls.cardContent}>
                                <span className={cls.cardPeriod}>{category.period}</span>
                                <h3 className={cls.cardTitle}>{category.title}</h3>
                                <p className={cls.cardDescription}>{category.description}</p>
                                <span className={cls.cardFooter}>
                                    {counts[category.slug] != null ? `${counts[category.slug]} ${boxersWord(counts[category.slug])}` : ' '}
                                    <img src={arrowRight} alt="" aria-hidden="true" className={cls.cardArrow} />
                                </span>
                            </div>
                        </Link>
                        <ImageCredit credit={category.cover.credit} className={cls.cardCredit} />
                    </figure>
                ))}
            </div>
            </section>
            ))}
        </div>
    )
}

export default BoxerCategoriesPage

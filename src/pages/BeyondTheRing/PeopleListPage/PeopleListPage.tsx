import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'
// same table and header look as the Boxers list
import cls from '@/pages/Boxer/BoxersPage/Boxers.module.scss'
import Input from '@/components/Input/Input'
import AvatarImg from '@/components/image/AvatarImg'
import arrowLeft from '@/assets/icons/common/arrow-left.svg'
import { findRoleByPath } from '@/config/peopleRoles'
import { peopleApi } from '@/api/peopleApi/peopleApi'
import { PersonTypes } from '@/types/personTypes'

type SortKey = 'name' | 'born' | 'induction'
const COLUMNS: { key: SortKey, title: string, className?: string }[] = [
    { key: 'name', title: 'Name' },
    { key: 'born', title: 'Date of birth', className: cls.tableRowVisible },
    { key: 'induction', title: 'Inducted', className: cls.tableRowVisible },
]

// /beyond-the-ring/:role - remounted per role
const PeopleListRoute = () => {
    const { role } = useParams()
    const info = findRoleByPath(role)
    if (!info) return <Navigate to="/beyond-the-ring" replace />
    return <PeopleListPage key={info.slug} rolePath={info.path} />
}

const PeopleListPage = ({ rolePath }: { rolePath: string }) => {
    const role = findRoleByPath(rolePath)!
    const { slug } = useParams()
    const profileOpen = Boolean(slug)
    const navigate = useNavigate()

    const [people, setPeople] = useState<PersonTypes[] | null>(null)
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState<SortKey>('name')
    const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC')
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        peopleApi.getPeople(role.slug).then(({ data }) => setPeople(data)).catch((err) => console.log(err))
    }, [role.slug])

    // the whole role fits in one request, so search and sort run in the browser
    const rows = useMemo(() => {
        const q = search.trim().toLowerCase()
        const list = (people ?? []).filter((p) => !q || p.name.toLowerCase().includes(q))
        const dir = sortOrder === 'ASC' ? 1 : -1
        return [...list].sort((a, b) => {
            const va = a[sortBy], vb = b[sortBy]
            if (va == null && vb == null) return a.name.localeCompare(b.name)
            if (va == null) return 1 // unknown values last in both directions
            if (vb == null) return -1
            return (String(va).localeCompare(String(vb), undefined, { numeric: true }) || a.name.localeCompare(b.name)) * dir
        })
    }, [people, search, sortBy, sortOrder])

    const handleSort = (key: SortKey) => {
        if (key === sortBy) setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
        else { setSortBy(key); setSortOrder('ASC') }
    }

    const openProfile = (person: PersonTypes) => {
        setScrollY(window.scrollY)
        navigate(person.slug)
    }

    useLayoutEffect(() => {
        if (!profileOpen) window.scrollTo(0, scrollY)
    }, [profileOpen, scrollY])

    return (
        <>
            <Outlet />
            <div className={cls.pageContainer}>
                <div className={classNames({ [cls.allBoxersHidden]: profileOpen })}>
                    <div className={cls.categoryHeader}>
                        <Link to="/beyond-the-ring" className={cls.categoryBack}>
                            <img src={arrowLeft} alt="" aria-hidden="true" />
                            Beyond the Ring
                        </Link>
                        <h1 className={cls.categoryTitle}>{role.title}</h1>
                        {people && <span className={cls.categoryPeriod}>{people.length} inductees</span>}
                    </div>
                    <div className={cls.settingsContainer}>
                        <Input type='text' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className={cls.allBoxersCardContainer}>
                        <table className={cls.boxersTable}>
                            <colgroup>
                                <col className={cls.colAvatar} />
                                <col style={{ width: '45%' }} />
                                <col />
                                <col />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th></th>
                                    {COLUMNS.map((c) => {
                                        const active = c.key === sortBy
                                        return (
                                            <th
                                                key={c.key}
                                                className={classNames(c.className, cls.tableHeadTh, cls.thHover, { [cls.thHighlighted]: active })}
                                                onClick={() => handleSort(c.key)}
                                                aria-sort={active ? (sortOrder === 'ASC' ? 'ascending' : 'descending') : undefined}
                                            >
                                                {c.title}
                                                {active && (
                                                    <svg className={classNames(cls.sortArrow, { [cls.sortArrowDesc]: sortOrder === 'DESC' })} viewBox="0 0 16 16" aria-hidden="true">
                                                        <path d="M8 3 L13 10 H3 Z" fill="currentColor" />
                                                    </svg>
                                                )}
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((p) => (
                                    <tr key={p.id} className={cls.tableRow} role="button" onClick={() => openProfile(p)}>
                                        <td><AvatarImg img={p.avatarImg} name={p.name} /></td>
                                        <td className={cls.boldText}>{p.name}</td>
                                        <td className={cls.tableRowVisible}>{p.born ?? '—'}</td>
                                        <td className={cls.tableRowVisible}>{p.induction ?? '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {!people && <div>Loading ...</div>}
                        {people && !rows.length && <div>Nobody found</div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PeopleListRoute

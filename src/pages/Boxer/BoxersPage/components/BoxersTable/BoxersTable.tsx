import { FC } from 'react'
import cls from '../../Boxers.module.scss'
import TableBoxerRowMemo from '../TableBoxerRow';
import { BoxerTypes, SortBoxerType } from '@/types/boxerTypes';
import classNames from 'classnames';

interface BoxersTableProps {
    boxers: BoxerTypes[]
    selectBoxer: (boxer: BoxerTypes) => void
    handleSortTable: (bdName: SortBoxerType | null) => void
    sortBy: SortBoxerType
    sortOrder: 'ASC' | 'DESC'
}

const SortArrow: FC<{ order: 'ASC' | 'DESC' }> = ({ order }) => (
    <svg
        className={classNames(cls.sortArrow, { [cls.sortArrowDesc]: order === 'DESC' })}
        viewBox="0 0 16 16"
        aria-hidden="true"
    >
        <path d="M8 3 L13 10 H3 Z" fill="currentColor" />
    </svg>
)

const BoxersTable: FC<BoxersTableProps> = ({ boxers, selectBoxer, handleSortTable, sortBy, sortOrder }) => {

    const tableThList = [
        {
            tableName: 'Name',
            bdName: 'name',
            className: undefined
        },
        {
            tableName: 'Date of birth',
            bdName: 'born',
            className: cls.tableRowVisible
        },
        {
            tableName: 'Date of introduction',
            bdName: 'induction',
            className: cls.tableRowVisible

        },
        {
            tableName: 'Bouts',
            bdName: 'bouts',
            className: cls.tableRowVisible
        },
        {
            tableName: 'Won',
            bdName: 'won',
            className: cls.tableRowVisible
        },
        {
            tableName: 'Won %',
            bdName: null,
            className: cls.tableRowVisible
        },
    ]

    return (
        <table className={cls.boxersTable}>
            <colgroup>
                <col className={cls.colAvatar} />
                <col className={cls.colName} />
                <col className={cls.colDate} />
                <col className={cls.colDateWide} />
                <col className={cls.colNumber} span={3} />
                <col className={cls.colActions} />
            </colgroup>
            <thead >
                <tr>
                    <th></th>
                    {tableThList.map((th) => {
                        const active = th.bdName === sortBy
                        return <th
                            key={th.tableName}
                            className={classNames(
                                th.className,
                                {
                                    [cls.thHover]: th.bdName,
                                    [cls.thHighlighted]: active
                                },
                                [cls.tableHeadTh])}
                            onClick={() => handleSortTable(th.bdName as SortBoxerType)}
                            aria-sort={active ? (sortOrder === 'ASC' ? 'ascending' : 'descending') : undefined}
                        >
                            {th.tableName}
                            {active && <SortArrow order={sortOrder} />}
                        </th>
                    })}
                    <th className={cls.tableRowVisible}></th>
                </tr>
            </thead>
            <tbody>
                {boxers.map((boxer) =>
                    <TableBoxerRowMemo
                        key={boxer.id}
                        boxer={boxer}
                        selectBoxer={selectBoxer}
                    />
                )}
            </tbody>
        </table >
    )
};



export default BoxersTable

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
}

const BoxersTable: FC<BoxersTableProps> = ({ boxers, selectBoxer, handleSortTable, sortBy }) => {

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
        <table>
            <thead >
                <tr>
                    <th></th>
                    {tableThList.map((th) =>
                        <th
                            className={classNames(
                                th.className,
                                {
                                    [cls.thHover]: th.bdName,
                                    [cls.thHighlighted]: th.bdName === sortBy
                                },
                                [cls.tableHeadTh])}
                            onClick={() => handleSortTable(th.bdName as SortBoxerType)}
                        >
                            {th.tableName}
                        </th>
                    )}
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

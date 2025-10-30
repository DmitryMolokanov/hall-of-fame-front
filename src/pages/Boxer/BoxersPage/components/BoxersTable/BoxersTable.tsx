import React, { FC } from 'react'
import cls from '../../Boxers.module.scss'
import TableBoxerRowMemo from '../TableBoxerRow';
import { BoxerTypes } from '@/types/boxerTypes';

interface BoxersTableProps {
    boxers: BoxerTypes[]
    selectBoxer: (boxer: BoxerTypes) => void
}

const BoxersTable: FC<BoxersTableProps> = ({ boxers, selectBoxer, }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th className={cls.tableRowVisible}>Date of birth</th>
                    <th className={cls.tableRowVisible}>Date of introduction</th>
                    <th className={cls.tableRowVisible}>Bouts</th>
                    <th className={cls.tableRowVisible}>Won</th>
                    <th className={cls.tableRowVisible}>Won %</th>
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
        </table>
    )
};



export default BoxersTable

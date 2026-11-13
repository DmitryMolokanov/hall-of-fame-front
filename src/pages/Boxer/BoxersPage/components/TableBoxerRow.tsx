import { BoxerTypes } from '@/types/boxerTypes';
import { FC, useState } from 'react'
import cls from '../Boxers.module.scss'
import AvatarImg from '@/components/image/AvatarImg';
import deleteBtnImgRed from '@assets/icons/common/trash-bin-red.svg'
import editBtnImgRed from '@assets/icons/common/edit-red.svg'
import classNames from 'classnames';
import ConfirmModal from '@/components/Modals/ConfirmModal/ConfirmModal';
import { boxersApi } from '@/api/boxersApi/boxersApi';
import React from 'react';

interface TableBoxerRowProps {
    boxer: BoxerTypes
    selectBoxer: (boxer: BoxerTypes) => void
}

const TableBoxerRow: FC<TableBoxerRowProps> = ({ boxer, selectBoxer, }) => {

    const [deleteModalVisible, setDeleteModalVisible] = useState(false)

    const NO_DATA = '—'

    const wonPercentCount = (won: string | null, bouts: string | null) => {
        if (won == null || bouts == null || !+bouts) return NO_DATA
        return Math.round(+won / +bouts * 100)
    }

    const deleteBoxer = async (boxer: BoxerTypes) => {
        const id = boxer.id
        try {
            const response = await boxersApi.deleteBoxer(id)
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

    const toggleDeleteModal = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (e) e.stopPropagation()
        setDeleteModalVisible(prev => !prev)
    }

    return (
        <>
            <ConfirmModal
                boxer={boxer}
                visible={deleteModalVisible}
                onHide={toggleDeleteModal}
                confirmClick={deleteBoxer}
            />

            <tr
                className={cls.tableRow}
                role='button'
                onClick={() => selectBoxer(boxer)}
            >
                <td>
                    <AvatarImg img={boxer.avatarImg} name={boxer.name} />
                </td>
                <td className={cls.boldText}>
                    {boxer.name}
                </td>
                <td className={cls.tableRowVisible}>
                    {boxer.born}
                </td>
                <td className={cls.tableRowVisible}>
                    {boxer.induction}
                </td>
                <td className={cls.tableRowVisible}>
                    {boxer.bouts ?? NO_DATA}
                </td>
                <td className={cls.tableRowVisible}>
                    {boxer.won ?? NO_DATA}
                </td>
                <td className={cls.tableRowVisible}>
                    {wonPercentCount(boxer.won, boxer.bouts)}
                </td>
                <td>
                    <div className={classNames(cls.tableRowBtnsContainer, [cls.tableRowVisible])}>
                        <button onClick={(e) => toggleDeleteModal(e)}>
                            <img src={deleteBtnImgRed} alt="delete" className={cls.tableRowBtnIcon} />
                        </button>
                        <button >
                            <img src={editBtnImgRed} alt="edit" className={cls.tableRowBtnIcon} />
                        </button>
                    </div>
                </td>
            </tr>

        </>

    )
};

const TableBoxerRowMemo = React.memo(TableBoxerRow)

export default TableBoxerRowMemo

import { BoxerTypes } from '@/types/boxerTypes';
import { FC, useState } from 'react'
import cls from '../../Boxers.module.scss'
import deleteImg from '@/assets/icons/common/trash-bin.svg'
import ConfirmModal from '@/components/Modals/ConfirmModal/ConfirmModal';
import { boxersApi } from '@/api/boxersApi/boxersApi';

interface BoxerCardNameProps {
    boxer: BoxerTypes
    selectBoxer: (boxer: BoxerTypes) => void
}

const BoxerCardName: FC<BoxerCardNameProps> = ({ boxer, selectBoxer }) => {

    const [deleteBtnVisible, setDeleteBtnVisible] = useState<BoxerTypes | undefined>(undefined)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)

    const deleteBoxer = async (boxer: BoxerTypes) => {
        const id = boxer.id
        try {
            const response = await boxersApi.deleteBoxer(id)
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

    const toggleDeleteModal = (e?: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
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
            <div
                className={cls.allBoxersCardName}
                key={boxer.id}
                role='button'
                onClick={() => selectBoxer(boxer)}
                onMouseEnter={() => setDeleteBtnVisible(boxer)}
                onMouseLeave={() => setDeleteBtnVisible(undefined)}
            >
                <span>{boxer.name}</span>
                {deleteBtnVisible?.id === boxer.id
                    && <img
                        src={deleteImg}
                        alt="bin"
                        role='button'
                        onClick={(e) => toggleDeleteModal(e)}
                    />}
            </div>
        </>
    )
};

export default BoxerCardName

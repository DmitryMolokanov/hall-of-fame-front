import ModlaLayout from '@/layout/ModalLayout/ModlaLayout';
import cls from './ConfirmModal.module.scss'
import { FC } from 'react';
import { BoxerTypes } from '@/types/boxerTypes';
import { Button } from '@/components/Buttons/Button';

interface ConfirmModalProps {
    visible: boolean
    onHide: () => void
    confirmClick: (boxer: BoxerTypes) => void
    boxer: BoxerTypes
}

const ConfirmModal: FC<ConfirmModalProps> = ({ visible, onHide, boxer, confirmClick }) => {
    return (
        <ModlaLayout
            visible={visible}
        >
            <div className={cls.container}>
                <span>Подтвердать удаление
                    <span className={cls.boldText}> {boxer.name}</span>!
                </span>
                <div className={cls.btnContainer}>
                    <Button label='Confirm' onClick={() => confirmClick(boxer)} variant='success' />
                    <Button label='Close' onClick={onHide} variant='danger' />
                </div>
            </div>
        </ModlaLayout>
    )
};

export default ConfirmModal

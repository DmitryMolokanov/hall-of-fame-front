import { BoxerTypes } from '@/types/boxerTypes';
import { FC } from 'react'
import cls from './BoxerInfoPage.module.scss'
import Button, { btnAnimation } from '@/components/Buttons/Button';
import arrowLeft from '@/assets/icons/common/arrow-left.svg'

interface BoxerInfoPageProps {
    selectedBoxer: BoxerTypes
    backToAllBoxers: () => void
}

const BoxerInfoPage: FC<BoxerInfoPageProps> = ({ selectedBoxer, backToAllBoxers }) => {
    return (
        <div className={cls.pageWrapper}>
            <div className={cls.backBtnContainer}>
                <Button label='Back' icon={arrowLeft} animation={btnAnimation.BACK} onClick={backToAllBoxers} />
            </div>
        </div>
    )
};

export default BoxerInfoPage

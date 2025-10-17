import { BoxerTypes } from '@/types/boxerTypes';
import { FC } from 'react'
import cls from './BoxerInfoPage.module.scss'
import { Button } from '@/components/Buttons/Button';
import arrowLeft from '@/assets/icons/common/arrow-left.svg'
import { LineChart } from '@/components/Charts/LineChart';
import { getChartData } from './utils/getChartData';

interface BoxerInfoPageProps {
    selectedBoxer: BoxerTypes
    backToAllBoxers: () => void
}

const BoxerInfoPage: FC<BoxerInfoPageProps> = ({ selectedBoxer, backToAllBoxers }) => {


    const getBio = () => {
        const statKey = ['name', "born", "died", "induction"]
        const bioData = Object.entries(selectedBoxer).filter(([key]) => statKey.includes(key))
        return bioData
    }

    const bioData = getBio()

    const chartData = getChartData(selectedBoxer) // делает выборку параметров для отображения графика (в том числе устанавливает цвет)

    return (
        <div className={cls.pageWrapper}>

            <div className={cls.backBtnContainer}>
                <Button label='Back' icon={arrowLeft} imgAnimation='leftSideMove' onClick={backToAllBoxers} />
            </div>

            <div className={cls.boxerCardWrapper}>
                <div className={cls.boxerCard}>
                    <div className={cls.boxerCardTitle}>
                        <h2 className={cls.title}> {selectedBoxer.name}</h2>
                    </div>
                    <div className={cls.boxerInfoContainer}>

                        <div className={cls.boxerInfoWrapper}>
                            <div className={cls.boxerInfoImg}>
                                {selectedBoxer.img &&
                                    <img src={selectedBoxer.img} alt="boxer-img" />
                                }
                            </div>

                            <div className={cls.dataContainer}>
                                {bioData.map(([key, value]) => {
                                    return <div>
                                        <span>{key}</span>
                                        <span>{value}</span>
                                    </div>
                                })}

                                <div className={cls.chartContainer}>
                                    <LineChart
                                        data={chartData}
                                        bouts={selectedBoxer.bouts}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className={cls.boxerInfoBio}>
                            <p>{selectedBoxer.biography}</p>
                        </div>

                    </div>
                </div>
            </div>

        </div >
    )
};

export default BoxerInfoPage

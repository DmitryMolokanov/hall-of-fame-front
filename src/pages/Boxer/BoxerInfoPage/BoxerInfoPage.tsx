import { BoxerTypes } from '@/types/boxerTypes';
import { FC } from 'react'
import cls from './BoxerInfoPage.module.scss'
import { Button } from '@/components/Buttons/Button';
import arrowLeft from '@/assets/icons/common/arrow-left.svg'
import { PieChart } from '@/components/Charts/PieChart';

interface BoxerInfoPageProps {
    selectedBoxer: BoxerTypes
    backToAllBoxers: () => void
}

const BoxerInfoPage: FC<BoxerInfoPageProps> = ({ selectedBoxer, backToAllBoxers }) => {

    const getChartData = () => {
        type StatKey = 'won' | 'lost' | 'drew' | 'nc' | 'kos'

        const statConfig: Record<StatKey, { label: string; color: string }> = {
            won: { label: 'won', color: '#25b833' },
            kos: { label: 'kos', color: '#3d9ad4' },
            lost: { label: 'lost', color: '#e31b1b' },
            drew: { label: 'drew', color: '#918e8e' },
            nc: { label: 'nc', color: '#0f0f0f' },
        }

        const chartData = Object.entries(selectedBoxer)
            .filter(([key, value]) => {
                const statKey = key as StatKey
                return statKey in statConfig && Boolean(value)
            })
            .map(([key, value]) => {
                const statKey = key as StatKey
                return {
                    id: key,
                    label: statConfig[statKey].label,
                    value: Number(value),
                    color: statConfig[statKey].color
                }
            })
        return chartData.reverse()
    }

    const chartData = getChartData()
    console.log(chartData)

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

                        <div className={cls.boxerInfoImg}>
                            {selectedBoxer.img &&
                                <img src={selectedBoxer.img} alt="boxer-img" />
                            }
                        </div>

                        <div className={cls.chartWrapper}>
                            <div className={cls.chartContainer}>
                                <PieChart data={chartData} />
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

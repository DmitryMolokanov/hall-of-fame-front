import { ChartDataType } from '@/types/chartDataTypes'
import { FC, useEffect, useState } from 'react'
import cls from './LineCharts.module.scss'

interface PieChartProps {
    bouts: string
    data: ChartDataType[]
}

export const LineChart: FC<PieChartProps> = ({ bouts, data }) => {

    const [isMounted, setIsMounted] = useState(false)

    const allBouts = Number(bouts)


    const getPercent = (statData: ChartDataType) => {
        if (statData.id === 'kos') {
            const wonData = data.find((item) => item.id === 'won')
            if (wonData) {
                return Math.round((statData.value / wonData?.value) * 100)
            }
        } else {
            return Math.round((statData.value / allBouts) * 100)
        }
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <div className={cls.chartContainer}>
            <div className={cls.allBouts}>
                <span>All bouts:</span>
                <span className={cls.allBoutsValue}>{allBouts}</span>
            </div>
            {data.map((item) => {
                const percent = getPercent(item)

                return <div className={cls.lineContainer}>
                    <div className={cls.lineText}>
                        <span>{item.label}:</span>
                        {item.id === 'kos'
                            ? `${item.value} (${percent}%)`
                            : item.value
                        }
                    </div>

                    <div className={cls.line}>
                        <div
                            className={cls.lineResult}
                            style={
                                {
                                    width: isMounted ? `${percent}%` : '0%',
                                    backgroundColor: `${item.color}`,
                                    borderTopRightRadius: percent === 100 ? '1rem' : '',
                                    borderBottomRightRadius: percent === 100 ? '1rem' : '',
                                    transition: 'width 1s ease-in-out'
                                }
                            }>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}
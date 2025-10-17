import { ChartDataType } from '@/types/chartDataTypes'
import { FC } from 'react'
import cls from './LineCharts.module.scss'

interface PieChartProps {
    bouts: string
    data: ChartDataType[]
}

export const LineChart: FC<PieChartProps> = ({ bouts, data }) => {
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

    return (
        <div className={cls.chartContainer}>
            <div className={cls.allBouts}>
                <span>All bouts:</span>
                <span>{allBouts}</span>
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
                                    width: `${percent}%`,
                                    backgroundColor: `${item.color}`,
                                    borderTopRightRadius: percent === 100 ? '1rem' : '',
                                    borderBottomRightRadius: percent === 100 ? '1rem' : '',
                                }
                            }>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}
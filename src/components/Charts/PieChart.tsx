import { ChartDataType } from '@/types/chartDataTypes'
import { ResponsivePie } from '@nivo/pie'
import { FC } from 'react'

interface PieChartProps {
    data: ChartDataType[]
}

export const PieChart: FC<PieChartProps> = ({ data }) => (
    <ResponsivePie
        data={data}
        colors={{ datum: 'data.color' }}
        margin={{ top: 10, right: 40, bottom: 10, left: 10 }}
        startAngle={180}
        endAngle={0}
        innerRadius={0.55}
        enableArcLinkLabels={false}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}

        defs={[
            {
                id: 'knockoutPattern',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(233, 250, 3, 1)',
                rotation: -45,
                lineWidth: 4,
                spacing: 8
            }
        ]}
        fill={[
            {
                match: { id: 'won' },
                id: 'knockoutPattern'
            }
        ]}
    />
)
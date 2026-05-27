import { BoxerTypes } from "@/types/boxerTypes";
import { ChartDataType, StatChartKeyType } from "@/types/chartDataTypes";


export const getChartData = (selectedBoxer: BoxerTypes) => {

    const statConfig: Record<StatChartKeyType, { label: string; color: string }> = {
        won: { label: 'won', color: '#3cbb5eff' },
        kos: { label: 'kos', color: '#4285f4' },
        lost: { label: 'lost', color: '#d93c44' },
        drew: { label: 'drew', color: '#c0c0c0ff' },
        nc: { label: 'nc', color: '#0f0f0f' },
    }

    function sortByStatKeyOrder(data: ChartDataType[]): ChartDataType[] {
        const order: StatChartKeyType[] = ['won', 'kos', 'lost', 'drew', 'nc'];

        return [...data].sort((a, b) => {
            const indexA = order.indexOf(a.id as StatChartKeyType);
            const indexB = order.indexOf(b.id as StatChartKeyType);
            return indexA - indexB;
        });
    }

    const chartData = Object.entries(selectedBoxer)
        .filter(([key, value]) => {
            const statKey = key as StatChartKeyType
            if (value > 0) {
                return statKey in statConfig && Boolean(value)
            }
        })
        .map(([key, value]) => {
            const statKey = key as StatChartKeyType
            return {
                id: key,
                label: statConfig[statKey].label,
                value: Number(value),
                color: statConfig[statKey].color,
            }
        })

    const sortedData = sortByStatKeyOrder(chartData)
    return sortedData
}

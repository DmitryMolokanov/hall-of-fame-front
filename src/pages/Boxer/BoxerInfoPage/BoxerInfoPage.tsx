import { BoxerTypes } from '@/types/boxerTypes';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import cls from './BoxerInfoPage.module.scss'
import { Button } from '@/components/Buttons/Button';
import arrowLeft from '@/assets/icons/common/arrow-left.svg'
import { LineChart } from '@/components/Charts/LineChart';
import { getChartData } from './utils/getChartData';
import { boxersApi } from '@/api/boxersApi/boxersApi';

const BoxerInfoPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [boxer, setBoxer] = useState<BoxerTypes | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if (!id) return
        let cancelled = false

        const fetchBoxer = async () => {
            setIsLoading(true)
            setNotFound(false)
            try {
                const response = await boxersApi.getBoxer(id)
                if (!cancelled) setBoxer(response.data)
            } catch (err: unknown) {
                if (!cancelled) {
                    const status = (err as { response?: { status?: number } })?.response?.status
                    if (status === 404) setNotFound(true)
                }
            } finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        fetchBoxer()
        return () => { cancelled = true }
    }, [id])

    useEffect(() => window.scrollTo(0, 0), [id])

    const backToAllBoxers = () => navigate('/boxers')

    const getBio = (selectedBoxer: BoxerTypes) => {
        const statKey = ['name', 'born', 'died', 'induction']
        return Object.entries(selectedBoxer).filter(([key, value]) => {
            if (value) return statKey.includes(key)
        })
    }

    const getTransformedBiography = (bio: string) => bio.split('<br>')

    if (isLoading) {
        return (
            <div className={cls.pageWrapper}>
                <div className={cls.backBtnContainer}>
                    <Button label='Back' icon={arrowLeft} imgAnimation='leftSideMove' onClick={backToAllBoxers} />
                </div>
                <div>Loading ...</div>
            </div>
        )
    }

    if (notFound || !boxer) {
        return (
            <div className={cls.pageWrapper}>
                <div className={cls.backBtnContainer}>
                    <Button label='Back' icon={arrowLeft} imgAnimation='leftSideMove' onClick={backToAllBoxers} />
                </div>
                <div>Boxer not found</div>
            </div>
        )
    }

    const bioData = getBio(boxer)
    const chartData = getChartData(boxer)
    const transformedBiography = getTransformedBiography(boxer.biography)

    return (
        <div className={cls.pageWrapper}>

            <div className={cls.backBtnContainer}>
                <Button label='Back' icon={arrowLeft} imgAnimation='leftSideMove' onClick={backToAllBoxers} />
            </div>

            <div className={cls.boxerCardWrapper}>
                <div className={cls.boxerCard}>
                    <div className={cls.boxerCardTitle}>
                        <h2 className={cls.title}> {boxer.name}</h2>
                    </div>
                    <div className={cls.boxerInfoContainer}>

                        <div className={cls.boxerInfoWrapper}>
                            <div className={cls.boxerInfoImg}>
                                {boxer.img &&
                                    <img src={boxer.img} alt="boxer-img" />
                                }
                            </div>

                            <div className={cls.dataContainer}>
                                {bioData.map(([key, value]) => {
                                    return <div
                                        className={cls.dataItemContainer}
                                        key={key}
                                    >
                                        <span className={cls.dataItemKey}>
                                            {key}:
                                        </span>
                                        <span className={cls.dataItemValue}>
                                            {value}
                                        </span>
                                    </div>
                                })}

                                <div className={cls.chartContainer}>
                                    <LineChart
                                        data={chartData}
                                        bouts={boxer.bouts}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className={cls.boxerInfoBio}>
                            {transformedBiography.map((paragraph, idx) => {
                                if (paragraph) return <p key={idx}>{paragraph}</p>
                                return null
                            })}
                        </div>

                    </div>
                </div>
            </div>

        </div >
    )
};

export default BoxerInfoPage

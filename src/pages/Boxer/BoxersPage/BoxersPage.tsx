import { useEffect, useState } from 'react';
import cls from './Boxers.module.scss'
import { boxersApi } from '@/api/boxersApi/boxersApi';
import { BoxerTypes } from '@/types/boxerTypes';
import BoxerInfoPage from '../BoxerInfoPage/BoxerInfoPage';

const BoxersPage = () => {

  const [boxers, setBoxers] = useState<BoxerTypes[]>([])
  const [selectedBoxer, setSelectedBoxer] = useState<BoxerTypes | undefined>(undefined)

  const getBoxers = async () => {
    try {
      const response = await boxersApi.getAllBoxers()
      setBoxers(response.data)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const selectBoxer = (item: BoxerTypes) => {
    setSelectedBoxer(item)
  }

  const backToAllBoxers = () => {
    setSelectedBoxer(undefined)
  }


  useEffect(() => {
    getBoxers()
  }, [])

  return (
    <div className={cls.pageContainer}>
      {selectedBoxer
        ? <BoxerInfoPage
          selectedBoxer={selectedBoxer}
          backToAllBoxers={backToAllBoxers}
        />
        : <div className={cls.allBoxersCardContainer}>
          {boxers.map((item) =>
            <div
              className={cls.allBoxersCardName}
              key={item.id}
              role='button'
              onClick={() => selectBoxer(item)}
            >
              <span >{item.name}</span>
            </div>
          )}
        </div>
      }
    </div>
  )
};

export default BoxersPage

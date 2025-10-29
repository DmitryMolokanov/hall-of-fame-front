import { useDeferredValue, useEffect, useRef, useState } from 'react';
import cls from './Boxers.module.scss'
import { boxersApi } from '@/api/boxersApi/boxersApi';
import { BoxerTypes } from '@/types/boxerTypes';
import BoxerInfoPage from '../BoxerInfoPage/BoxerInfoPage';
import Input from '@/components/Input/Input';
import TableBoxerRowMemo from './components/TableBoxerRow';
import useDebounce from '@/hooks/useDebounce';


const BoxersPage = () => {

  const [boxers, setBoxers] = useState<BoxerTypes[]>([])
  const [selectedBoxer, setSelectedBoxer] = useState<BoxerTypes | undefined>(undefined)
  const [offset, setOffset] = useState(0)
  const [hasMoreLoad, setHasMoreLoad] = useState(true)
  const [search, setSearch] = useState('')

  const ref = useRef(null)
  const debounceSearchValue = useDebounce(search, 300)

  const limit = 20

  //--------------- API -------------------------//
  const getBoxers = async (limit: number, offset: number) => {
    try {
      const response = await boxersApi.getBoxers(limit, offset)
      if (response.data.length) {
        setBoxers([...boxers, ...response.data])
        setOffset(prev => prev + limit)
      } else {
        setHasMoreLoad(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const searchBoxers = async (search: string) => {
    try {
      const response = await boxersApi.getSearchBoxers(search)
      if (response.status >= 200 && response.status < 300) {
        setBoxers(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  //---------------------------------------------//

  const selectBoxer = (item: BoxerTypes) => {
    setSelectedBoxer(item)
  }

  const backToAllBoxers = () => {
    setSelectedBoxer(undefined)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchData = e.target.value
    setSearch(searchData)
  }


  useEffect(() => {
    if (hasMoreLoad) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          console.log('intersection')
          getBoxers(limit, offset)
        }
      })
      if (ref.current) observer.observe(ref.current)
      return () => observer.disconnect()
    }
  }, [ref, offset, hasMoreLoad])

  useEffect(() => {
    if (debounceSearchValue) {
      searchBoxers(debounceSearchValue)
    } else {
      setOffset(0)
      getBoxers(limit, 0)
    }
  }, [debounceSearchValue])

  return (
    <div className={cls.pageContainer}>
      {selectedBoxer
        ? <BoxerInfoPage
          selectedBoxer={selectedBoxer}
          backToAllBoxers={backToAllBoxers}
        />
        : <div>
          <div className={cls.settingsContainer}>
            <Input
              type='text'
              placeholder='Search'
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className={cls.allBoxersCardContainer}>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th className={cls.tableRowVisible}>Date of birth</th>
                  <th className={cls.tableRowVisible}>Date of introduction</th>
                  <th className={cls.tableRowVisible}>Bouts</th>
                  <th className={cls.tableRowVisible}>Won</th>
                  <th className={cls.tableRowVisible}>Won %</th>
                </tr>
              </thead>
              <tbody>
                {boxers.map((boxer) =>
                  <TableBoxerRowMemo
                    boxer={boxer}
                    selectBoxer={selectBoxer}
                    ref={ref}
                  />
                )}
              </tbody>
            </table>
            <div ref={ref} className={cls.observerTrigger}></div>
          </div>
        </div>
      }
    </div>
  )
};

export default BoxersPage

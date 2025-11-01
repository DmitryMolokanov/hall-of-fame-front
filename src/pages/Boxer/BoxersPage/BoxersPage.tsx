import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import cls from './Boxers.module.scss'
import { boxersApi } from '@/api/boxersApi/boxersApi';
import { BoxerTypes, SortBoxerType } from '@/types/boxerTypes';
import BoxerInfoPage from '../BoxerInfoPage/BoxerInfoPage';
import Input from '@/components/Input/Input';
import useDebounce from '@/hooks/useDebounce';
import BoxersTable from './components/BoxersTable/BoxersTable';
import classNames from 'classnames';


const BoxersPage = () => {

  const [boxers, setBoxers] = useState<BoxerTypes[]>([])
  const [selectedBoxer, setSelectedBoxer] = useState<BoxerTypes | undefined>(undefined)
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC')
  const [sortBy, setSortBy] = useState<SortBoxerType>('name')
  const [scrollY, setScrollY] = useState<number>(0)
  const [offset, setOffset] = useState(0)
  const [hasMoreLoad, setHasMoreLoad] = useState(true)

  const ref = useRef(null)
  const debounceSearchValue = useDebounce(search, 500)

  const limit = 20

  //--------------- API -------------------------//
  const getBoxers = async (limit: number, offset: number, sortOrder: 'ASC' | 'DESC', sortBy: string,) => {
    try {
      const response = await boxersApi.getBoxers(limit, offset, sortOrder, sortBy)
      if (response.data.length) {
        if (offset > 0) {
          // для бесконечной загрузки
          setBoxers([...boxers, ...response.data])
        } else {
          // для первоначальной загрузки
          setBoxers(response.data)
        }
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
        setHasMoreLoad(false)
      }
    } catch (err) {
      console.log(err)
    }
  }
  //---------------------------------------------//

  const selectBoxer = useCallback((item: BoxerTypes) => {
    setSelectedBoxer(item)
    setScrollY(window.scrollY)
  }, [])

  const backToAllBoxers = () => {
    setSelectedBoxer(undefined)
    // если не поиск, возвращаемся к ленивой загрузке
    if (!search.length) {
      setHasMoreLoad(true)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchData = e.target.value
    setSearch(searchData)
  }

  const handleSortTable = (bdName: SortBoxerType | null) => {
    if (bdName) {
      setSortBy(bdName)
      if (sortOrder === 'ASC') {
        setSortOrder('DESC')
      } else {
        setSortOrder('ASC')
      }
    }
  }


  useEffect(() => {
    if (hasMoreLoad && !selectedBoxer) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          console.log('intersection')
          getBoxers(limit, offset, sortOrder, sortBy)
        }
      }, {
        rootMargin: '100px'
      })
      if (ref.current) observer.observe(ref.current)
      return () => observer.disconnect()
    }
  }, [ref, offset, hasMoreLoad, selectedBoxer, sortOrder, sortBy])


  useEffect(() => {
    if (debounceSearchValue.length) {
      searchBoxers(debounceSearchValue)
    } else {
      setOffset(0)
      setHasMoreLoad(true)
      getBoxers(limit, 0, sortOrder, sortBy)
    }
  }, [debounceSearchValue, sortOrder, sortBy])


  useLayoutEffect(() => {
    // для возвразения скрола на то место с которого ушел
    if (!selectedBoxer) {
      window.scrollTo(0, scrollY)
    }
  }, [selectedBoxer, scrollY])


  return (
    <>
      {selectedBoxer &&
        <BoxerInfoPage
          selectedBoxer={selectedBoxer}
          backToAllBoxers={backToAllBoxers}
        />
      }

      <div className={cls.pageContainer}>
        <div className={classNames({ [cls.allBoxersHidden]: selectedBoxer })}>
          <div className={cls.settingsContainer}>
            <Input
              type='text'
              placeholder='Search'
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className={cls.allBoxersCardContainer}>
            <BoxersTable
              boxers={boxers}
              selectBoxer={selectBoxer}
              handleSortTable={handleSortTable}
              sortBy={sortBy}
            />
            <div ref={ref} className={cls.observerTrigger}></div>
          </div>
        </div>
      </div>
    </>
  )
};

export default BoxersPage

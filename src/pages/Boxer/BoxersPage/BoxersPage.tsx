import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cls from './Boxers.module.scss'
import { boxersApi } from '@/api/boxersApi/boxersApi';
import { BoxerTypes, SortBoxerType } from '@/types/boxerTypes';
import Input from '@/components/Input/Input';
import useDebounce from '@/hooks/useDebounce';
import BoxersTable from './components/BoxersTable/BoxersTable';

const SCROLL_STORAGE_KEY = 'boxersPageScrollY'

const BoxersPage = () => {

  const navigate = useNavigate()

  const [boxers, setBoxers] = useState<BoxerTypes[]>([])
  const [search, setSearch] = useState<string | undefined>(undefined)
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC')
  const [sortBy, setSortBy] = useState<SortBoxerType>('name')
  const [offset, setOffset] = useState(0)
  const [hasMoreLoad, setHasMoreLoad] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const ref = useRef(null)
  const debounceSearchValue = useDebounce(search, 500)

  const limit = 20

  //--------------- API -------------------------//
  const getBoxers = useCallback(async (limit: number, offset: number, sortOrder: 'ASC' | 'DESC', sortBy: string,) => {
    setIsLoading(true)
    try {
      const response = await boxersApi.getBoxers(limit, offset, sortOrder, sortBy)
      if (response.data.length) {
        if (offset > 0) {
          setBoxers(prev => [...prev, ...response.data])
          setOffset(prev => prev + limit)
        } else {
          setBoxers(response.data)
          setOffset(limit)
        }
      } else {
        setHasMoreLoad(false)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

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
    sessionStorage.setItem(SCROLL_STORAGE_KEY, String(window.scrollY))
    navigate(`/boxers/${item.id}`)
  }, [navigate])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSortTable = (bdName: SortBoxerType | null) => {
    setSearch('')
    if (bdName) {
      setSortBy(bdName)
      setSortOrder(prev => prev === 'ASC' ? 'DESC' : 'ASC')
    }
  }

  useEffect(() => {
    if (hasMoreLoad) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          getBoxers(limit, offset, sortOrder, sortBy)
        }
      }, {
        rootMargin: '100px'
      })
      if (ref.current) observer.observe(ref.current)
      return () => observer.disconnect()
    }
  }, [offset, hasMoreLoad, sortOrder, sortBy, getBoxers])


  useEffect(() => {
    if (debounceSearchValue !== undefined) {
      if (debounceSearchValue.length) {
        searchBoxers(debounceSearchValue)
      } else {
        setOffset(0)
        setHasMoreLoad(true)
        setBoxers([])
        getBoxers(limit, 0, sortOrder, sortBy)
      }
    }
  }, [debounceSearchValue, sortOrder, sortBy])


  useLayoutEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_STORAGE_KEY)
    if (saved !== null && boxers.length > 0) {
      window.scrollTo(0, Number(saved))
      sessionStorage.removeItem(SCROLL_STORAGE_KEY)
    }
  }, [boxers.length])


  return (
    <div className={cls.pageContainer}>
      <div>
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
          {isLoading && <div>Loading ...</div>}
        </div>
      </div>
    </div>
  )
};

export default BoxersPage

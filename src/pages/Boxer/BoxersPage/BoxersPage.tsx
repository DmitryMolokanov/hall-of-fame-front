import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import cls from './Boxers.module.scss'
import { boxersApi } from '@/api/boxersApi/boxersApi';
import { BoxerTypes } from '@/types/boxerTypes';
import BoxerInfoPage from '../BoxerInfoPage/BoxerInfoPage';
import Input from '@/components/Input/Input';
import useDebounce from '@/hooks/useDebounce';
import BoxersTable from './components/BoxersTable/BoxersTable';
import classNames from 'classnames';


const BoxersPage = () => {

  const [boxers, setBoxers] = useState<BoxerTypes[]>([])
  const [selectedBoxer, setSelectedBoxer] = useState<BoxerTypes | undefined>(undefined)
  const [offset, setOffset] = useState(0)
  const [hasMoreLoad, setHasMoreLoad] = useState(true)
  const [search, setSearch] = useState('')
  const [scrollY, setScrollY] = useState<number>(0)

  const ref = useRef(null)
  const debounceSearchValue = useDebounce(search, 500)

  const limit = 20

  //--------------- API -------------------------//
  const getBoxers = async (limit: number, offset: number, notSearch?: boolean) => {
    try {
      const response = await boxersApi.getBoxers(limit, offset)
      if (response.data.length) {
        if (!notSearch) {
          setBoxers([...boxers, ...response.data])
        } else {
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
    setHasMoreLoad(true)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchData = e.target.value
    setSearch(searchData)
  }


  useEffect(() => {
    if (hasMoreLoad && !selectedBoxer) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          console.log('intersection')
          getBoxers(limit, offset, false)
        }
      }, {
        rootMargin: '100px'
      })
      if (ref.current) observer.observe(ref.current)
      return () => observer.disconnect()
    }
  }, [ref, offset, hasMoreLoad, selectedBoxer])


  useEffect(() => {
    if (debounceSearchValue.length) {
      searchBoxers(debounceSearchValue)
    } else {
      setOffset(0)
      getBoxers(limit, 0, true)
    }
  }, [debounceSearchValue])


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
            />
            <div ref={ref} className={cls.observerTrigger}></div>
          </div>
        </div>
      </div>
    </>
  )
};

export default BoxersPage

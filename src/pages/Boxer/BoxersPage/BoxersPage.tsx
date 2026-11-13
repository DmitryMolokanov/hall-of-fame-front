import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import cls from './Boxers.module.scss'
import { boxersApi } from '@/api/boxersApi/boxersApi';
import { BoxerTypes, SortBoxerType } from '@/types/boxerTypes';
import Input from '@/components/Input/Input';
import useDebounce from '@/hooks/useDebounce';
import BoxersTable from './components/BoxersTable/BoxersTable';
import classNames from 'classnames';
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import { findCategory } from '@/config/boxerCategories';
import arrowLeft from '@/assets/icons/common/arrow-left.svg'


// /boxers/:category - remounted per category so paging and search state start fresh
const BoxersCategoryRoute = () => {
  const { category } = useParams()
  if (!findCategory(category)) return <Navigate to="/boxers" replace />
  return <BoxersPage key={category} category={category!} />
}

const BoxersPage = ({ category }: { category: string }) => {
  const categoryInfo = findCategory(category)!

  const [boxers, setBoxers] = useState<BoxerTypes[]>([])
  // /boxers/:category/:slug renders the profile (Outlet) over this list, which stays mounted
  const { slug } = useParams()
  const profileOpen = Boolean(slug)
  const navigate = useNavigate()
  const [search, setSearch] = useState<string | undefined>(undefined)
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC')
  const [sortBy, setSortBy] = useState<SortBoxerType>('name')
  const [scrollY, setScrollY] = useState<number>(0)
  const [offset, setOffset] = useState(0)
  const [hasMoreLoad, setHasMoreLoad] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const ref = useRef(null)
  const debounceSearchValue = useDebounce(search, 500)

  const limit = 20

  //--------------- API -------------------------//
  // one page per call; identical calls in flight are skipped (observer + effects can fire together),
  // and a newer request (e.g. a new sort order) makes older responses obsolete
  const inFlightKey = useRef<string | null>(null)
  const latestRequest = useRef(0)

  const getBoxers = useCallback(async (limit: number, offset: number, sortOrder: 'ASC' | 'DESC', sortBy: string,) => {
    const key = `${sortOrder}|${sortBy}|${offset}`
    if (inFlightKey.current === key) return
    inFlightKey.current = key
    const requestId = ++latestRequest.current
    setIsLoading(true)
    try {
      const { data } = await boxersApi.getBoxers(limit, offset, sortOrder, sortBy, category)
      if (requestId !== latestRequest.current) return
      // offset 0 replaces the rows (first load, new sort), otherwise the page is appended
      setBoxers((prev) => (offset > 0 ? [...prev, ...data] : data))
      setOffset(offset + data.length)
      setHasMoreLoad(data.length === limit)
    } catch (err) {
      console.log(err)
    } finally {
      if (requestId === latestRequest.current) {
        inFlightKey.current = null
        setIsLoading(false)
      }
    }
  }, [category])

  useEffect(() => {
    // first page right away: the scroll observer alone may never fire (tall window, hidden tab)
    getBoxers(limit, 0, 'ASC', 'name')
  }, [getBoxers])

  const searchBoxers = async (search: string) => {
    try {
      const response = await boxersApi.getSearchBoxers(search, category)
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
    setScrollY(window.scrollY)
    if (item.slug) navigate(item.slug)
  }, [navigate])

  useEffect(() => {
    // back from a profile: if not searching, resume lazy loading
    if (!profileOpen && search !== undefined && !search.length) {
      setHasMoreLoad(true)
    }
  }, [profileOpen])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchData = e.target.value
    setSearch(searchData)
  }

  const handleSortTable = (bdName: SortBoxerType | null) => {
    setSearch('')
    if (bdName) {
      // same column toggles the direction; a new column starts ascending
      if (bdName === sortBy) {
        setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
      } else {
        setSortBy(bdName)
        setSortOrder('ASC')
      }
    }
  }

  useEffect(() => console.log(boxers, offset), [boxers, offset])

  useEffect(() => {
    // подгрузка
    if (hasMoreLoad && !profileOpen) {
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
  }, [ref, offset, hasMoreLoad, profileOpen, sortOrder, sortBy, getBoxers])


  useEffect(() => {
    // поиск
    if (debounceSearchValue !== undefined) {
      if (debounceSearchValue.length) {
        searchBoxers(debounceSearchValue)
      } else {
        setOffset(0)
        setHasMoreLoad(true)
        // keep the current rows until the re-sorted page arrives (offset 0 replaces them),
        // otherwise the table collapses and jumps on every sort change
        getBoxers(limit, 0, sortOrder, sortBy)
      }
    }
  }, [debounceSearchValue, sortOrder, sortBy])


  useLayoutEffect(() => {
    // для возвразения скрола на то место с которого ушел
    if (!profileOpen) {
      window.scrollTo(0, scrollY)
    }
  }, [profileOpen, scrollY])


  return (
    <>
      <Outlet />

      <div className={cls.pageContainer}>
        <div className={classNames({ [cls.allBoxersHidden]: profileOpen })}>
          <div className={cls.categoryHeader}>
            <Link to="/boxers" className={cls.categoryBack}>
              <img src={arrowLeft} alt="" aria-hidden="true" />
              All categories
            </Link>
            <h1 className={cls.categoryTitle}>{categoryInfo.title}</h1>
            <span className={cls.categoryPeriod}>{categoryInfo.period}</span>
          </div>
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
              sortOrder={sortOrder}
            />
            <div ref={ref} className={cls.observerTrigger}></div>
            {isLoading && <div>Loading ...</div>}
          </div>
        </div>
      </div>
    </>
  )
};

export default BoxersCategoryRoute

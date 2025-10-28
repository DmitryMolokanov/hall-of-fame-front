import { useEffect, useState } from 'react';
import cls from './Boxers.module.scss'
import { boxersApi } from '@/api/boxersApi/boxersApi';
import { BoxerTypes } from '@/types/boxerTypes';
import BoxerInfoPage from '../BoxerInfoPage/BoxerInfoPage';
import Input from '@/components/Input/Input';
import TableBoxerRow from './components/TableBoxerRow';


const BoxersPage = () => {

  const [boxers, setBoxers] = useState<BoxerTypes[]>([])
  const [selectedBoxer, setSelectedBoxer] = useState<BoxerTypes | undefined>(undefined)
  const [search, setSearch] = useState('')

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchData = e.target.value
    setSearch(searchData)
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
                  <TableBoxerRow
                    boxer={boxer}
                    selectBoxer={selectBoxer}
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  )
};

export default BoxersPage

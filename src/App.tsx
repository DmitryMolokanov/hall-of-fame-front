
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [boxer, setBoxer] = useState<any>([])

  const getBoxer = async () => {
    const response = await fetch('/api')
    const result = await response.json()
    console.log(result)
    setBoxer(result)
  }

  useEffect(() => {
    getBoxer()
  }, [])

  return (
    <>
      {boxer.map((boxer) => (
        <div>
          {boxer.img &&
            <div style={{ display: 'flex', borderRadius: '50%', width: '150px', height: '300px' }}>
              <img style={{ objectFit: 'cover' }} src={boxer.img} alt="img" />
            </div>
          }
        </div>
      ))}
    </>
  )
}

export default App

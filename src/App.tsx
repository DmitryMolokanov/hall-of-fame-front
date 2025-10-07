import useTheme from './hooks/useTheme'
import AppRouter from './router/AppRouter'

function App() {

  useTheme()

  return (
    <>
      <div className='app'>
        <AppRouter />
      </div>
    </>
  )
}

export default App

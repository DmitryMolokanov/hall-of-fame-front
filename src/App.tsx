import classNames from 'classnames'
import AppRouter from './router/AppRouter'
import { useThemeStore } from './store/ThemeStore'

function App() {

  const { theme } = useThemeStore()


  return (
    <>
      <div className={classNames('lightTheme', { "darkTheme": theme === 'dark' })}>
        <AppRouter />
      </div>
    </>
  )
}

export default App

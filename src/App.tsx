import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Results from './pages/Results'
import { ThemeProvider } from './components/theme/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='engenha-search-theme'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App

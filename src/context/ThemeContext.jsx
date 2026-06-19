/**
 * context/ThemeContext.jsx
 * Dark mode only — light mode removed per request.
 */
import { createContext, useContext, useEffect } from 'react'

const ThemeContext = createContext({ isDark: true, toggle: () => {} })

export function ThemeProvider({ children }) {
  useEffect(() => {
    // Always dark
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')
    document.body.classList.remove('light')
    document.body.classList.add('dark')
  }, [])

  return (
    <ThemeContext.Provider value={{ isDark: true, toggle: () => {} }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

'use client'

// React Imports
import { createContext, useCallback, useMemo, useState } from 'react'

const HorizontalNavContext = createContext({})

export const HorizontalNavProvider = ({ children }) => {
  // States for horizontal nav
  const [horizontalNavState, setHorizontalNavState] = useState({
    activeMenu: null, // current active menu item
    isDropdownOpen: false, // for dropdowns if any
  })

  // Update horizontal nav state
  const updateHorizontalNavState = useCallback(values => {
    setHorizontalNavState(prevState => ({
      ...prevState,
      ...values
    }))
  }, [])

  // Toggle dropdown menus
  const toggleDropdown = useCallback((value) => {
    setHorizontalNavState(prev => ({
      ...prev,
      isDropdownOpen: value !== undefined ? Boolean(value) : !Boolean(prev?.isDropdownOpen)
    }))
  }, [])

  // Set active menu item
  const setActiveMenu = useCallback(menu => {
    setHorizontalNavState(prev => ({
      ...prev,
      activeMenu: menu
    }))
  }, [])

  // Memoize provider value
  const horizontalNavProviderValue = useMemo(
    () => ({
      ...horizontalNavState,
      updateHorizontalNavState,
      toggleDropdown,
      setActiveMenu
    }),
    [horizontalNavState, updateHorizontalNavState, toggleDropdown, setActiveMenu]
  )

  return (
    <HorizontalNavContext.Provider value={horizontalNavProviderValue}>
      {children}
    </HorizontalNavContext.Provider>
  )
}

export default HorizontalNavContext
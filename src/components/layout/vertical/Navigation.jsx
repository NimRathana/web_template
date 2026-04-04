'use client'

// React Imports
import { useRef, useEffect } from 'react'
import { Radio } from '@mui/material'
import Link from '@/components/Link'
import { styled, useTheme } from '@mui/material/styles'
import VerticalNav, { NavHeader } from '@menu/vertical-menu'
import VerticalMenu from './VerticalMenu'
import Logo from '@components/layout/shared/Logo'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import navigationCustomStyles from '@core/styles/vertical/navigationCustomStyles'
import { useSettings } from '@core/hooks/useSettings'

const StyledBoxForShadow = styled('div')(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none',
  width: 'calc(100% + 15px)',
  height: theme.mixins.toolbar.minHeight,
  transition: 'opacity .15s ease-in-out',
  background: `linear-gradient(var(--mui-palette-background-default) 5%, rgb(var(--mui-palette-background-defaultChannel) / 0.85) 30%, rgb(var(--mui-palette-background-defaultChannel) / 0.5) 65%, rgb(var(--mui-palette-background-defaultChannel) / 0.3) 75%, transparent)`,
  '&.scrolled': {
    opacity: 1
  }
}))

const Navigation = () => {
  // Hooks
  const theme = useTheme()
  const { isBreakpointReached, toggleVerticalNav, isCollapsed, toggleCollapse } = useVerticalNav()
  const { settings, updateSettings } = useSettings()

  // Refs
  const shadowRef = useRef(null)

  const scrollMenu = (container, isPerfectScrollbar) => {
    container = isBreakpointReached || !isPerfectScrollbar ? container.target : container

    if (shadowRef && container.scrollTop > 0) {
      // @ts-ignore
      if (!shadowRef.current.classList.contains('scrolled')) {
        // @ts-ignore
        shadowRef.current.classList.add('scrolled')
      }
    } else {
      // @ts-ignore
      shadowRef.current.classList.remove('scrolled')
    }
  }

  useEffect(() => {
    if (settings.layout === 'collapsed') {
      toggleCollapse(true)
    } else if (settings.layout === 'vertical') {
      toggleCollapse(false)
    }
    // No need to handle 'horizontal' here, as Navigation will return null
  }, [settings.layout, toggleCollapse])

  // If horizontal, don't render vertical menu
  if (settings.layout === 'horizontal') return null

  return (
    // eslint-disable-next-line lines-around-comment
    // Sidebar Vertical Menu
    <VerticalNav customBreakpoint='800px' customStyles={navigationCustomStyles(theme, settings.skin)}>
      {/* Nav Header including Logo & nav toggle icons  */}
      <NavHeader>
        <Link href='/'>
          <Logo />
        </Link>
        {!isBreakpointReached && (
          <Radio
            checked={Boolean(isCollapsed)}
            onChange={() =>
              updateSettings({ layout: isCollapsed ? 'vertical' : 'collapsed' })
            }
          />
        )}
        {isBreakpointReached && <i className='ri-close-line text-xl' onClick={() => toggleVerticalNav(false)} />}
      </NavHeader>
      <StyledBoxForShadow ref={shadowRef} />
      <VerticalMenu scrollMenu={scrollMenu} />
    </VerticalNav>
  )
}

export default Navigation

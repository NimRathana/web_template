'use client'

import { useMemo } from 'react'
import { ThemeProvider, extendTheme, lighten, darken } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import ModeChanger from './ModeChanger'
import { useSettings } from '@core/hooks/useSettings'
import defaultCoreTheme from '@core/theme'
import primaryColorConfig from '@configs/primaryColorConfig'

const CustomThemeProvider = ({ children, direction }) => {
  const { settings } = useSettings()

  const theme = useMemo(() => {
    const colorScheme = {
      palette: {
        primary: {
          main: primaryColorConfig[0].main,
          light: lighten(primaryColorConfig[0].main, 0.2),
          dark: darken(primaryColorConfig[0].main, 0.1)
        }
      }
    }

    const coreTheme = defaultCoreTheme(settings.mode || 'light', direction)
    return extendTheme({ ...coreTheme, ...colorScheme })
  }, [settings.mode, direction])

  return (
    <AppRouterCacheProvider options={{ prepend: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModeChanger />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}

export default CustomThemeProvider
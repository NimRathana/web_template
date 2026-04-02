'use client'

import { useMemo, useState, useEffect } from 'react'
import { ThemeProvider, extendTheme, lighten, darken } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import ModeChanger from './ModeChanger'
import { useSettings } from '@core/hooks/useSettings'
import defaultCoreTheme from '@core/theme'
import primaryColorConfig from '@configs/primaryColorConfig'

const CustomThemeProvider = ({ children, direction }) => {
  const { settings } = useSettings()
  const [loading, setLoading] = useState(true)

  const theme = useMemo(() => {
    const coreTheme = defaultCoreTheme(settings.mode || 'light', direction, settings.skin || 'default')
    const mainColor = settings.primaryColor || primaryColorConfig[0].main

    const primaryPalette = {
      main: mainColor,
      light: lighten(mainColor, 0.2),
      dark: darken(mainColor, 0.1),
    };

    return extendTheme({
      ...coreTheme,
      colorSchemes: {
        ...coreTheme.colorSchemes,
        light: {
          palette: {
            ...coreTheme.colorSchemes?.light?.palette,
            primary: primaryPalette,
          }
        },
        dark: {
          palette: {
            ...coreTheme.colorSchemes?.dark?.palette,
            primary: primaryPalette,
          }
        }
      },
      colorSchemeSelector: 'class'
    })
  }, [settings.primaryColor, settings.skin, settings.mode, direction])

  useEffect(() => {
    setLoading(false)
  }, [theme])

  return (
    <AppRouterCacheProvider options={{ prepend: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModeChanger />
        {loading ? null : children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}

export default CustomThemeProvider
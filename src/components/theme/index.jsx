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
    const coreTheme = defaultCoreTheme(settings.mode || 'light', direction)
    const mainColor = settings.primaryColor || primaryColorConfig[0].main

    // We define the full primary object to include the custom opacity strings 
    // that your chip.js and colorSchemes.js require.
    const primaryPalette = {
      main: mainColor,
      light: lighten(mainColor, 0.2),
      dark: darken(mainColor, 0.1),
      contrastText: '#fff',
      // These reference the internal MUI channel, making them dynamic
      lighterOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.08)',
      lightOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.16)',
      mainOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.24)',
      darkOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.32)',
      darkerOpacity: 'rgb(var(--mui-palette-primary-mainChannel) / 0.38)'
    }

    return extendTheme({
      ...coreTheme,
      colorSchemes: {
        ...coreTheme.colorSchemes,
        light: {
          palette: {
            ...coreTheme.colorSchemes?.light?.palette,
            primary: primaryPalette
          }
        },
        dark: {
          palette: {
            ...coreTheme.colorSchemes?.dark?.palette,
            primary: primaryPalette
          }
        }
      },
      colorSchemeSelector: 'class',
    })
  }, [settings.primaryColor, settings.mode, direction])

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
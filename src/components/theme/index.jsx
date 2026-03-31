'use client'

// React Imports
import { useMemo } from 'react'

// MUI Imports
import { deepmerge } from '@mui/utils'
import {
  ThemeProvider,
  extendTheme,
  lighten,
  darken
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Emotion
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

// Component Imports
import ModeChanger from './ModeChanger'

// Config Imports
import primaryColorConfig from '@configs/primaryColorConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Core Theme
import defaultCoreTheme from '@core/theme'

// Emotion cache
const clientSideEmotionCache = createCache({ key: 'css', prepend: true })

const AppThemeProvider = ({ children, direction }) => {
  const { settings } = useSettings()

  const theme = useMemo(() => {
    const newColorScheme = {
      colorSchemes: {
        light: {
          palette: {
            primary: {
              main: primaryColorConfig[0].main,
              light: lighten(primaryColorConfig[0].main, 0.2),
              dark: darken(primaryColorConfig[0].main, 0.1)
            }
          }
        },
        dark: {
          palette: {
            primary: {
              main: primaryColorConfig[0].main,
              light: lighten(primaryColorConfig[0].main, 0.2),
              dark: darken(primaryColorConfig[0].main, 0.1)
            }
          }
        }
      }
    }

    const coreTheme = deepmerge(
      defaultCoreTheme(settings.mode || 'light', direction),
      newColorScheme
    )

    return extendTheme({
    ...coreTheme,
    cssVarPrefix: 'mui',
    colorSchemeSelector: 'class'
  })
  }, [settings.mode, direction])

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModeChanger />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}

export default AppThemeProvider
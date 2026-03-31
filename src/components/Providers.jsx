// import AppThemeProvider from '@components/theme'
// import { SettingsProvider } from '@core/contexts/settingsContext'
// import { getMode, getSettingsFromCookie } from '@core/utils/serverHelpers'

// const Providers = ({ children, settingsCookie = {}, mode = 'light', direction = 'ltr' }) => {
//   // Ensure settingsCookie and mode are always defined
//   const safeSettingsCookie = Object.keys(settingsCookie).length ? settingsCookie : getSettingsFromCookie() || {}

//   const safeMode = mode || getMode() || 'light'

//   return (
//     <SettingsProvider settingsCookie={safeSettingsCookie} mode={safeMode}>
//       <AppThemeProvider direction={direction}>
//         {children}
//       </AppThemeProvider>
//     </SettingsProvider>
//   )
// }

// export default Providers




// Providers.jsx (Server Component ✅)
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from './theme'

// server utils
import { getMode, getSettingsFromCookie } from '@core/utils/serverHelpers'

const Providers = props => {
  const { children, direction } = props

  const mode = getMode()
  const settingsCookie = getSettingsFromCookie()

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
        <ThemeProvider direction={direction}>
          {children}
        </ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

export default Providers
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import CustomThemeProvider from './theme'
import { getMode, getSettingsFromCookie } from '@core/utils/serverHelpers'

const Providers = props => {
  const { children, direction } = props

  const mode = getMode()
  const settingsCookie = getSettingsFromCookie()

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
        <CustomThemeProvider direction={direction}>
          {children}
        </CustomThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

export default Providers
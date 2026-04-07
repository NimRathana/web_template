import 'react-perfect-scrollbar/dist/css/styles.css'
import './globals.css'
import { getSettingsFromCookie } from '@core/utils/serverHelpers'
import 'remixicon/fonts/remixicon.css';

export const dynamic = "force-dynamic"

export const metadata = {
  title: 'Rathana Template',
  description: 'Develop next-level web apps with Rathana Template - NextJS Admin Dashboard Template. Now, updated with lightning-fast routing powered by MUI and App router.'
}

const RootLayout = async ({ children }) => {
  const settingsCookie = await getSettingsFromCookie()
  const direction = settingsCookie?.direction || 'ltr'
  return (
    <html id='__next' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
    </html>
  )
}

export default RootLayout
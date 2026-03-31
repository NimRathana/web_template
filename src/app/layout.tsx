// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import './globals.css'

import 'remixicon/fonts/remixicon.css';

import type { ReactNode } from 'react'

export const metadata = {
  title: 'Rathana Template',
  description:
    'Develop next-level web apps with Rathana Template - NextJS Admin Dashboard Template. Now, updated with lightning-fast routing powered by MUI and App router.'
}

// Explicitly type the props
interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const direction = 'ltr'

  return (
    <html id="__next" dir={direction}>
      <body className="flex is-full min-bs-full flex-auto flex-col">{children}</body>
    </html>
  )
}

export default RootLayout
'use client'

import { useState } from 'react'
import ThemeCustomizer from '@components/theme/ThemeCustomizer'
import { useTheme } from '@mui/material/styles'

const LayoutWrapper = ({ verticalLayout }) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme();

  return (
    <div className='flex flex-col flex-auto'>
      {verticalLayout}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="pulse"
        style={{
          position: 'fixed',
          top: 200,
          insetInlineEnd: 0,
          zIndex: 1000,
          width: 40,
          height: 40,
          borderStartStartRadius: 20,
          borderEndStartRadius: 20,
          backgroundColor: theme.palette.primary.main,
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
        }}
      >
        <i className="ri-settings-3-line" />
      </button>
      <ThemeCustomizer open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default LayoutWrapper
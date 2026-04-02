'use client'

import { useState } from 'react'
import ThemeCustomizer from '@components/theme/ThemeCustomizer'
import { useTheme } from '@mui/material/styles'
import { useSettings } from '@core/hooks/useSettings'

const LayoutWrapper = ({ verticalLayout }) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme();
  const { settings } = useSettings();

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
          right: 0,
          zIndex: 1000,
          width: 40,
          height: 40,
          borderRadius: '20px 0 0 20px',  
          backgroundColor: settings.primaryColor || theme.palette.primary.main,    
          border: 'none',
          boxShadow: '0 4px 15px rgba(255, 193, 7, 0.35)',
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
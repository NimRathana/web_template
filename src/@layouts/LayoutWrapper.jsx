'use client'

import { useState } from 'react'
import ThemeCustomizer from '@components/theme/ThemeCustomizer'

const LayoutWrapper = ({ verticalLayout }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='flex flex-col flex-auto'>
      {verticalLayout}

      <button
        onClick={() => setOpen(true)}
        className="pulse"
        style={{
          position: 'fixed',
          bottom: 50,
          right: 20,
          zIndex: 1500,
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <i className="ri-settings-3-line spin-slow" />
      </button>
      <ThemeCustomizer open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default LayoutWrapper
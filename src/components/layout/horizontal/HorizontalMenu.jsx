'use client'

import React, { useState } from 'react'
import { Box, Menu as MuiMenu, MenuItem as MuiMenuItem, Button } from '@mui/material'
import Link from 'next/link'
import { MenuData } from '@data/navigation/MenuData'

const HorizontalMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [submenuItems, setSubmenuItems] = useState([])

  const handleOpenSubmenu = (event, children) => {
    setAnchorEl(event.currentTarget)
    setSubmenuItems(children || [])
  }

  const handleCloseSubmenu = () => {
    setAnchorEl(null)
    setSubmenuItems([])
  }

  return (
    <Box sx={{
      width: '100%',
      borderTop: '1px solid var(--mui-palette-divider)'
    }}>
      {MenuData.map((item, idx) => {
        if (item.type === 'submenu') {
          return (
            <div key={idx}>
              <Button
                endIcon={item.suffix}
                onMouseEnter={(e) => handleOpenSubmenu(e, item.children)}
                onMouseLeave={handleCloseSubmenu}
                variant="text"
                color="primary"
              >
                {item.label}
              </Button>
              <MuiMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseSubmenu}
                MenuListProps={{
                  onMouseEnter: () => handleOpenSubmenu(anchorEl, item.children),
                  onMouseLeave: handleCloseSubmenu,
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                {submenuItems.map((sub, subIdx) => (
                  <MuiMenuItem key={subIdx}>
                    {sub.href ? <Link href={sub.href}>{sub.label}</Link> : sub.label}
                    {sub.suffix && <Box ml={1}>{sub.suffix}</Box>}
                  </MuiMenuItem>
                ))}
              </MuiMenu>
            </div>
          )
        }

        if (item.type === 'item') {
          return (
            <Button key={idx} variant="text" color="primary" endIcon={item.suffix}>
              {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
            </Button>
          )
        }

        return null
      })}
    </Box>
  )
}

export default HorizontalMenu
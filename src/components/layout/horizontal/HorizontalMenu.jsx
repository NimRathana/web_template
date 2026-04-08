'use client'

import { useState } from 'react'
import { Box, Button, Menu as MuiMenu, MenuItem as MuiMenuItem } from '@mui/material'
import Link from 'next/link'
import { MenuData } from '@data/navigation/MenuData'
import themeConfig from '@configs/themeConfig'

const HorizontalMenu = ({ scrolled, isHorizontal }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [submenuItems, setSubmenuItems] = useState([])

  const handleOpen = (event, children) => {
    setAnchorEl(event.currentTarget)
    setSubmenuItems(children || [])
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSubmenuItems([])
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderTop: '1px solid var(--mui-palette-divider)',
        mt: 1,
        px: isHorizontal || scrolled ? `${themeConfig.layoutPadding}px` : 0,
        transition: 'padding 0.3s ease',
      }}
    >
      {MenuData.map((item, idx) => {
        if (item.type === 'submenu') {
          return (
            <Box key={idx}>
              <Button
                endIcon={item.suffix}
                onMouseEnter={(e) => handleOpen(e, item.children)}
                variant="text"
              >
                {item.label}
              </Button>

              <MuiMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                  onMouseLeave: handleClose
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                {submenuItems.map((sub, subIdx) => (
                  <MuiMenuItem key={subIdx} onClick={handleClose}>
                    {sub.href ? <Link href={sub.href}>{sub.label}</Link> : sub.label}
                    {sub.suffix && <Box ml={1}>{sub.suffix}</Box>}
                  </MuiMenuItem>
                ))}
              </MuiMenu>
            </Box>
          )
        }

        if (item.type === 'item') {
          return (
            <Button key={idx} variant="text" endIcon={item.suffix}>
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
'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  Box,
  Button,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Link from '@/components/Link'
import { MenuData } from '@data/navigation/MenuData'
import themeConfig from '@configs/themeConfig'
import React from 'react'

const HorizontalMenu = ({ scrolled, isHorizontal }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // For desktop hover menus
  const [anchorEl, setAnchorEl] = useState(null)
  const [submenuItems, setSubmenuItems] = useState([])

  // For mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleOpen = (event, children) => {
    setAnchorEl(event.currentTarget)
    setSubmenuItems(children || [])
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSubmenuItems([])
  }

  const toggleDrawer = open => () => setDrawerOpen(open)

  // SubMenuButton renders a submenu with its own anchor/menu
  const SubMenuButton = ({ item }) => {
    const [anchor, setAnchor] = useState(null)
    const open = Boolean(anchor)

    const onOpen = e => setAnchor(e.currentTarget)
    const onClose = () => setAnchor(null)

    return (
      <Box sx={{ display: 'inline-block' }} onMouseLeave={onClose}>
        <Button
          endIcon={item.suffix}
          onMouseEnter={onOpen}
          onFocus={onOpen}
          variant="text"
        >
          {item.label}
        </Button>

        <MuiMenu
          anchorEl={anchor}
          open={open}
          onClose={onClose}
          MenuListProps={{ onMouseLeave: onClose }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {item.children && item.children.map((sub, sIdx) => {
            if (sub.type === 'item') {
              return (
                <MuiMenuItem key={sIdx} onClick={onClose}>
                  {sub.href ? <Link href={sub.href}>{sub.label}</Link> : sub.label}
                  {sub.suffix && <Box ml={1}>{sub.suffix}</Box>}
                </MuiMenuItem>
              )
            }

            if (sub.type === 'submenu') {
              // Nested submenu: render simple label or flatten
              return (
                <MuiMenuItem key={sIdx} onClick={onClose}>
                  {sub.label}
                </MuiMenuItem>
              )
            }

            return null
          })}
        </MuiMenu>
      </Box>
    )
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
        position: 'relative'
      }}
    >
      {/* Mobile hamburger */}
      {isMobile && (
        <IconButton onClick={toggleDrawer(true)} aria-label="Open menu" size="large">
          <MenuIcon />
        </IconButton>
      )}

      {/* Desktop menu items */}
      {!isMobile && (
        <>
          {MenuData.map((item, idx) => {
            // Section with children: render group of items
            if (item.type === 'section') {
              return (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {item.children && item.children.map((child, cIdx) => (
                    <React.Fragment key={`${idx}-${cIdx}`}>
                      {child.type === 'item' && (
                        <Button variant="text" endIcon={child.suffix}>
                          {child.href ? <Link href={child.href}>{child.label}</Link> : child.label}
                        </Button>
                      )}
                      {child.type === 'submenu' && (
                        <SubMenuButton item={child} />
                      )}
                    </React.Fragment>
                  ))}
                </Box>
              )
            }

            if (item.type === 'submenu') {
              return <SubMenuButton key={idx} item={item} />
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
        </>
      )}

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 280 }} role="presentation" onKeyDown={toggleDrawer(false)}>
          <List>
            {MenuData.map((item, idx) => {
              if (item.type === 'section' && item.children) {
                return (
                  <Box key={idx} sx={{ px: 1 }}>
                    {item.children.map((child, cIdx) => (
                      <ListItemButton key={`${idx}-${cIdx}`} component={child.href ? Link : 'div'} href={child.href} onClick={toggleDrawer(false)}>
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    ))}
                  </Box>
                )
              }

              if (item.type === 'submenu') {
                return (
                  <Box key={idx} sx={{ px: 1 }}>
                    <ListItemText primary={item.label} sx={{ pl: 1, pt: 1, pb: 0.5 }} />
                    {item.children && item.children.map((sub, sIdx) => (
                      <ListItemButton key={`${idx}-sub-${sIdx}`} component={sub.href ? Link : 'div'} href={sub.href} onClick={toggleDrawer(false)} sx={{ pl: 3 }}>
                        <ListItemText primary={sub.label} />
                      </ListItemButton>
                    ))}
                  </Box>
                )
              }

              if (item.type === 'item') {
                return (
                  <ListItemButton key={idx} component={item.href ? Link : 'div'} href={item.href} onClick={toggleDrawer(false)}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                )
              }

              return null
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}

export default HorizontalMenu
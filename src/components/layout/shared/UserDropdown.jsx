'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const router = useRouter()

  const handleToggle = () => setOpen(prev => !prev)

  const handleClose = (event, url) => {
    if (url) router.push(url)
    if (anchorRef.current && anchorRef.current.contains(event?.target)) return
    setOpen(false)
  }

  return (
    <>
      <Badge
        overlap="circular"
        badgeContent={<BadgeContentSpan onClick={handleToggle} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          ref={anchorRef}
          alt="John Doe"
          src="/images/avatars/1.png"
          onClick={handleToggle}
          sx={{ width: 38, height: 38, cursor: 'pointer' }}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        />
      </Badge>

      <Popper
        open={open}
        transition
        disablePortal
        placement="bottom-end"
        anchorEl={anchorRef.current}
        sx={{ zIndex: 1200, minWidth: 240, mt: 1 }}
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper elevation={3}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  <Box
                    display="flex"
                    alignItems="center"
                    px={2}
                    py={1}
                    gap={2}
                    tabIndex={-1}
                  >
                    <Avatar alt="John Doe" src="/images/avatars/1.png" />
                    <Box display="flex" flexDirection="column">
                      <Typography fontWeight={500} color="text.primary">
                        John Doe
                      </Typography>
                      <Typography variant="caption">Admin</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem onClick={handleClose}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <i className="ri-user-3-line" />
                      <Typography color="text.primary">My Profile</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <i className="ri-settings-4-line" />
                      <Typography color="text.primary">Settings</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <i className="ri-money-dollar-circle-line" />
                      <Typography color="text.primary">Pricing</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <i className="ri-question-line" />
                      <Typography color="text.primary">FAQ</Typography>
                    </Box>
                  </MenuItem>
                  <Box px={2} py={1}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      size="small"
                      endIcon={<i className="ri-logout-box-r-line" />}
                      onClick={e => handleClose(e, '/login')}
                      sx={{ '& .MuiButton-endIcon': { ml: 1.5 } }}
                    >
                      Logout
                    </Button>
                  </Box>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default UserDropdown
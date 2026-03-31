'use client'

// React Imports
import { useRef, useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
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

// Styled component for badge content
const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  // States
  const [open, setOpen] = useState(false)

  // Refs
  const anchorRef = useRef(null)

  // Hooks
  const router = useRouter()

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false)
  }

  const handleDropdownClose = (event, url) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target)) {
      return
    }

    setOpen(false)
  }

  return (
  <>
    <Badge
      ref={anchorRef}
      overlap="circular"
      badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      className="ml-2"
    >
      <Avatar
        alt="John Doe"
        src="/images/avatars/1.png"
        onClick={handleDropdownOpen}
        className="cursor-pointer w-[38px] h-[38px]"
      />
    </Badge>

    <Popper
      open={open}
      transition
      placement="bottom-end"
      anchorEl={anchorRef.current}
      className="min-w-[240px] mt-2 z-50"
    >
      {({ TransitionProps, placement }) => (
        <Fade
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom-end' ? 'right top' : 'left top'
          }}
        >
          <Paper className="shadow-xl rounded-lg overflow-hidden">
            <ClickAwayListener onClickAway={handleDropdownClose}>
              <MenuList className="py-2">

                {/* USER INFO */}
                <div className="flex items-center gap-3 px-4 py-2">
                  <Avatar alt="John Doe" src="/images/avatars/1.png" />
                  <div className="flex flex-col">
                    <Typography className="font-medium text-sm">
                      John Doe
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      Admin
                    </Typography>
                  </div>
                </div>

                <Divider />

                {/* MENU ITEMS */}
                {[
                  { icon: 'ri-user-3-line', label: 'My Profile' },
                  { icon: 'ri-settings-4-line', label: 'Settings' },
                  { icon: 'ri-money-dollar-circle-line', label: 'Pricing' },
                  { icon: 'ri-question-line', label: 'FAQ' }
                ].map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={handleDropdownClose}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                  >
                    <i className={item.icon} />
                    <Typography className="text-sm">
                      {item.label}
                    </Typography>
                  </MenuItem>
                ))}

                <Divider />

                {/* LOGOUT */}
                <div className="px-4">
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    size="small"
                    endIcon={<i className="ri-logout-box-r-line" />}
                    onClick={(e) => handleDropdownClose(e, '/login')}
                  >
                    Logout
                  </Button>
                </div>

              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  </>
);
}

export default UserDropdown

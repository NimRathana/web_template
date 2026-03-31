'use client'

import React from 'react'
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  Tooltip,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material'
import { useSettings } from '@core/hooks/useSettings'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import CircleIcon from '@mui/icons-material/Circle'

const PRIMARY_COLORS = [
  { name: 'purple', hex: '#7E57C2' },
  { name: 'teal', hex: '#009688' },
  { name: 'amber', hex: '#FFC107' },
  { name: 'red', hex: '#F44336' },
  { name: 'blue', hex: '#2196F3' },
  { name: 'indigo', hex: '#3F51B5' }
]

const skins = ['default', 'bordered']
const layouts = ['vertical', 'collapsed', 'horizontal']
const contents = ['compact', 'wide']
const directions = ['ltr', 'rtl']

const ThemeCustomizer = ({ open, onClose }) => {
  const { settings, updateSettings, resetSettings } = useSettings()

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 320, p: 3 } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Theme Customizer
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Customize & Preview in Real Time
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Primary Color */}
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        Primary Color
      </Typography>
      <Stack direction="row" spacing={1} mb={3}>
        {PRIMARY_COLORS.map(color => {
          const isSelected = settings.primaryColor === color.name
          return (
            <Tooltip key={color.name} title={color.name.charAt(0).toUpperCase() + color.name.slice(1)}>
              <Box
                onClick={() => updateSettings({ primaryColor: color.name })}
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: color.hex,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: isSelected ? '3px solid' : '2px solid transparent',
                  borderColor: isSelected ? 'primary.main' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                {isSelected && <CheckIcon fontSize="small" />}
              </Box>
            </Tooltip>
          )
        })}
      </Stack>

      {/* Theme Mode */}
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        Theme
      </Typography>
      <RadioGroup
        row
        value={settings.mode || 'light'}
        onChange={e => updateSettings({ mode: e.target.value })}
        aria-label="theme mode"
      >
        <FormControlLabel value="light" control={<Radio />} label="Light" />
        <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        <FormControlLabel value="system" control={<Radio />} label="System" />
      </RadioGroup>

      <Divider sx={{ my: 3 }} />

      {/* Skins */}
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        Skins
      </Typography>
      <Stack direction="row" spacing={2} mb={3}>
        {skins.map(skin => {
          const selected = settings.skin === skin || (!settings.skin && skin === 'default')
          return (
            <Box
              key={skin}
              onClick={() => updateSettings({ skin })}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 1,
                border: selected ? '2px solid' : '1px solid',
                borderColor: selected ? 'primary.main' : 'divider',
                cursor: 'pointer',
                textAlign: 'center',
                userSelect: 'none',
                fontWeight: selected ? 600 : 400,
                color: selected ? 'primary.main' : 'text.primary'
              }}
            >
              {skin.charAt(0).toUpperCase() + skin.slice(1)}
            </Box>
          )
        })}
      </Stack>

      {/* Layout */}
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        Layout
      </Typography>
      <Stack direction="row" spacing={1} mb={3}>
        {layouts.map(layout => {
          const selected = settings.layout === layout || (!settings.layout && layout === 'vertical')
          return (
            <Box
              key={layout}
              onClick={() => updateSettings({ layout })}
              sx={{
                flex: 1,
                p: 1.5,
                borderRadius: 1,
                border: selected ? '2px solid' : '1px solid',
                borderColor: selected ? 'primary.main' : 'divider',
                cursor: 'pointer',
                textAlign: 'center',
                userSelect: 'none',
                fontWeight: selected ? 600 : 400,
                color: selected ? 'primary.main' : 'text.primary'
              }}
            >
              {layout.charAt(0).toUpperCase() + layout.slice(1)}
            </Box>
          )
        })}
      </Stack>

      {/* Content Width */}
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        Content Width
      </Typography>
      <Stack direction="row" spacing={2} mb={3}>
        {contents.map(content => {
          const selected = settings.contentWidth === content || (!settings.contentWidth && content === 'compact')
          return (
            <Box
              key={content}
              onClick={() => updateSettings({ contentWidth: content })}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 1,
                border: selected ? '2px solid' : '1px solid',
                borderColor: selected ? 'primary.main' : 'divider',
                cursor: 'pointer',
                textAlign: 'center',
                userSelect: 'none',
                fontWeight: selected ? 600 : 400,
                color: selected ? 'primary.main' : 'text.primary'
              }}
            >
              {content.charAt(0).toUpperCase() + content.slice(1)}
            </Box>
          )
        })}
      </Stack>

      {/* Direction */}
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        Direction
      </Typography>
      <Stack direction="row" spacing={2} mb={3}>
        {directions.map(dir => {
          const selected = settings.direction === dir || (!settings.direction && dir === 'ltr')
          return (
            <Box
              key={dir}
              onClick={() => updateSettings({ direction: dir })}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 1,
                border: selected ? '2px solid' : '1px solid',
                borderColor: selected ? 'primary.main' : 'divider',
                cursor: 'pointer',
                textAlign: 'center',
                userSelect: 'none',
                fontWeight: selected ? 600 : 400,
                color: selected ? 'primary.main' : 'text.primary',
                textTransform: 'uppercase'
              }}
            >
              {dir}
            </Box>
          )
        })}
      </Stack>

      {/* Reset Button */}
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={() =>
          resetSettings()
        }
      >
        Reset to Default
      </Button>
    </Drawer>
  )
}

export default ThemeCustomizer
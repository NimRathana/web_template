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
} from '@mui/material'
import { useSettings } from '@core/hooks/useSettings'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import MonitorIcon from '@mui/icons-material/Monitor'

const PRIMARY_COLORS = [
  { name: 'purple', hex: '#7E57C2' },
  { name: 'teal', hex: '#009688' },
  { name: 'amber', hex: '#FFC107' },
  { name: 'red', hex: '#F44336' },
  { name: 'blue', hex: '#2196F3' },
  { name: 'indigo', hex: '#3F51B5' },
]

const ThemeCustomizer = ({ open, onClose }) => {
  const { settings, updateSettings, resetSettings } = useSettings()

  // Helper function to check if an option is selected
  const isSelected = (key, value) => {
    if (settings[key] === value) return true
    
    // Default fallbacks
    if (!settings[key]) {
      if (value === 'default' || value === 'vertical' || value === 'compact' || value === 'ltr') {
        return true
      }
    }
    return false
  }

  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose} 
      PaperProps={{ 
        sx: { 
          width: 340, 
          p: 3, 
          bgcolor: '#1E1B2E',
          color: 'white',
        } 
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Theme Customizer
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Customize & Preview in Real Time
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3, borderColor: '#2A263F' }} />

      {/* ==================== THEMING SECTION ==================== */}
      <Box sx={{ 
        bgcolor: '#2A263F', 
        px: 2, 
        py: 1, 
        borderRadius: 1, 
        mb: 3 
      }}>
        <Typography 
          variant="subtitle2" 
          fontWeight={600} 
          sx={{ color: '#FFC107', mb: 2 }}
        >
          Theming
        </Typography>

        {/* Primary Color */}
        <Typography variant="subtitle2" fontWeight={600} mb={1.5}>
          Primary Color
        </Typography>
        <Stack direction="row" spacing={1.5} mb={3} flexWrap="wrap">
          {PRIMARY_COLORS.map((color) => {
            const selected = settings.primaryColor === color.name
            return (
              <Tooltip key={color.name} title={color.name.charAt(0).toUpperCase() + color.name.slice(1)}>
                <Box
                  onClick={() => updateSettings({ primaryColor: color.name })}
                  sx={{
                    width: 42,
                    height: 42,
                    bgcolor: color.hex,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    position: 'relative',
                    border: selected ? '3px solid #FFC107' : '2px solid transparent',
                  }}
                >
                  {selected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CheckIcon sx={{ color: 'white', fontSize: 18 }} />
                    </Box>
                  )}
                </Box>
              </Tooltip>
            )
          })}
        </Stack>

        {/* Theme Mode */}
        <Typography variant="subtitle2" fontWeight={600} mb={1.5}>
          Theme
        </Typography>
        <Stack direction="row" spacing={2} mb={3}>
          {[
            { value: 'light', icon: <LightModeIcon />, label: 'Light' },
            { value: 'dark', icon: <DarkModeIcon />, label: 'Dark' },
            { value: 'system', icon: <MonitorIcon />, label: 'System' },
          ].map((item) => {
            const selected = (settings.mode || 'light') === item.value
            return (
              <Box
                key={item.value}
                onClick={() => updateSettings({ mode: item.value })}
                sx={{
                  flex: 1,
                  p: 2,
                  borderRadius: 2,
                  border: selected ? '2px solid #FFC107' : '1px solid #3A3550',
                  bgcolor: selected ? '#3A3550' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Box sx={{ color: selected ? '#FFC107' : '#A5A0B8', fontSize: 28 }}>
                  {item.icon}
                </Box>
                <Typography variant="caption" fontWeight={selected ? 600 : 400}>
                  {item.label}
                </Typography>
              </Box>
            )
          })}
        </Stack>

        {/* Skins */}
        <Typography variant="subtitle2" fontWeight={600} mb={1.5}>
          Skins
        </Typography>
        <Stack direction="row" spacing={2}>
          {['default', 'bordered'].map((skin) => {
            const selected = isSelected('skin', skin)
            return (
              <Box
                key={skin}
                onClick={() => updateSettings({ skin })}
                sx={{
                  flex: 1,
                  p: 1.5,
                  borderRadius: 2,
                  border: selected ? '2px solid #FFC107' : '1px solid #3A3550',
                  bgcolor: '#12101F',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: 60,
                    bgcolor: '#1E1B2E',
                    border: skin === 'bordered' ? '2px dashed #666' : 'none',
                    borderRadius: 1,
                    mb: 1,
                  }}
                />
                <Typography variant="caption" align="center" display="block" fontWeight={selected ? 600 : 400}>
                  {skin.charAt(0).toUpperCase() + skin.slice(1)}
                </Typography>
                {selected && (
                  <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <CheckIcon sx={{ color: '#FFC107', fontSize: 18 }} />
                  </Box>
                )}
              </Box>
            )
          })}
        </Stack>
      </Box>

      {/* ==================== LAYOUT SECTION ==================== */}
      <Box sx={{ bgcolor: '#2A263F', px: 2, py: 1, borderRadius: 1 }}>
        <Typography 
          variant="subtitle2" 
          fontWeight={600} 
          sx={{ color: '#FFC107', mb: 2 }}
        >
          Layout
        </Typography>

        {/* Layout Types */}
        <Typography variant="subtitle2" fontWeight={600} mb={1.5}>
          Layout
        </Typography>
        <Stack direction="row" spacing={1.5} mb={3}>
          {['vertical', 'collapsed', 'horizontal'].map((layout) => {
            const selected = isSelected('layout', layout)
            return (
              <Box
                key={layout}
                onClick={() => updateSettings({ layout })}
                sx={{
                  flex: 1,
                  p: 1.5,
                  borderRadius: 2,
                  border: selected ? '2px solid #FFC107' : '1px solid #3A3550',
                  bgcolor: '#12101F',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <Box sx={{ height: 70, bgcolor: '#1E1B2E', borderRadius: 1, mb: 1 }} />
                <Typography variant="caption" align="center" display="block">
                  {layout.charAt(0).toUpperCase() + layout.slice(1)}
                </Typography>
                {selected && (
                  <CheckIcon sx={{ position: 'absolute', top: 8, right: 8, color: '#FFC107' }} />
                )}
              </Box>
            )
          })}
        </Stack>

        {/* Content Width */}
        <Typography variant="subtitle2" fontWeight={600} mb={1.5}>
          Content
        </Typography>
        <Stack direction="row" spacing={1.5} mb={3}>
          {['compact', 'wide'].map((content) => {
            const selected = isSelected('contentWidth', content)
            return (
              <Box
                key={content}
                onClick={() => updateSettings({ contentWidth: content })}
                sx={{
                  flex: 1,
                  p: 1.5,
                  borderRadius: 2,
                  border: selected ? '2px solid #FFC107' : '1px solid #3A3550',
                  bgcolor: '#12101F',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <Box sx={{ height: 55, bgcolor: '#1E1B2E', borderRadius: 1, mb: 1 }} />
                <Typography variant="caption" align="center" display="block">
                  {content.charAt(0).toUpperCase() + content.slice(1)}
                </Typography>
                {selected && (
                  <CheckIcon sx={{ position: 'absolute', top: 8, right: 8, color: '#FFC107' }} />
                )}
              </Box>
            )
          })}
        </Stack>

        {/* Direction */}
        <Typography variant="subtitle2" fontWeight={600} mb={1.5}>
          Direction
        </Typography>
        <Stack direction="row" spacing={1.5}>
          {['ltr', 'rtl'].map((dir) => {
            const selected = isSelected('direction', dir)
            return (
              <Box
                key={dir}
                onClick={() => updateSettings({ direction: dir })}
                sx={{
                  flex: 1,
                  p: 2,
                  borderRadius: 2,
                  border: selected ? '2px solid #FFC107' : '1px solid #3A3550',
                  bgcolor: '#12101F',
                  cursor: 'pointer',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  position: 'relative',
                }}
              >
                {dir}
                {selected && (
                  <CheckIcon sx={{ position: 'absolute', top: 8, right: 8, color: '#FFC107' }} />
                )}
              </Box>
            )
          })}
        </Stack>
      </Box>

      {/* Reset Button */}
      <Button
        variant="outlined"
        fullWidth
        sx={{ 
          mt: 4, 
          borderColor: '#FFC107', 
          color: '#FFC107', 
          '&:hover': { 
            borderColor: '#FFD54F',
            bgcolor: 'rgba(255, 193, 7, 0.1)'
          } 
        }}
        onClick={resetSettings}
      >
        Reset to Default
      </Button>
    </Drawer>
  )
}

export default ThemeCustomizer
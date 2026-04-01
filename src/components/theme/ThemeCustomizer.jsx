"use client";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  alpha,
  useTheme,
  Popover
} from "@mui/material";
import { useState } from "react";
import { useSettings } from "@core/hooks/useSettings";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MonitorIcon from "@mui/icons-material/Monitor";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import "react-color-palette/css";
import { ColorPicker, useColor } from "react-color-palette";

const PRIMARY_COLORS = [
  { name: "purple", hex: "#8C57FF" },
  { name: "teal", hex: "#009688" },
  { name: "amber", hex: "#FFB400" },
  { name: "red", hex: "#FF4C51" },
  { name: "blue", hex: "#16B1FF" },
  { name: "indigo", hex: "#3F51B5" },
];

const ThemeCustomizer = ({ open, onClose }) => {
  const theme = useTheme();
  const { settings, updateSettings, resetSettings } = useSettings();
  const [pickerAnchor, setPickerAnchor] = useState(null);
  const [color, setColor] = useColor("hex", settings.customColor);

  // Helper to get the active highlight color
  const activeColor = theme.palette.primary.main;

  const isSelected = (key, value) => {
    if (settings[key] === value) return true;
    const defaults = {
      skin: "default",
      layout: "vertical",
      contentWidth: "compact",
      direction: "ltr",
    };
    return !settings[key] && defaults[key] === value;
  };

  const optionCardStyle = (selected) => ({
    flex: 1,
    p: 1.5,
    cursor: "pointer",
    borderRadius: "10px",
    position: "relative",
    transition: "all 0.2s ease-in-out",
    border: 2,
    borderColor: selected ? "primary.main" : "divider",
    "&:hover": {
      borderColor: selected ? activeColor : alpha(activeColor, 0.5),
      transform: "translateY(-2px)",
      bgcolor: alpha(activeColor, 0.04),
    },
  });

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400,
          bgcolor: "background.paper",
          backgroundImage: "none",
          boxShadow: theme.shadows[20],
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Theme Customizer
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Customize & Preview in Real Time
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={resetSettings}
            size="small"
            sx={{ color: "text.secondary" }}
          >
            <RestartAltIcon />
          </IconButton>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
      </Box>

      <Divider />

      <Box sx={{ p: 3 }}>
        {/* Primary Color */}
        <Typography
          variant="subtitle2"
          sx={{ mb: 2, color: "text.primary", fontWeight: 600 }}
        >
          Primary Color
        </Typography>
        <Stack direction="row" spacing={1} mb={4} flexWrap="wrap">
          {PRIMARY_COLORS.map((color) => (
            <Box key={color.name} onClick={() => updateSettings({ primaryColor: color.name })} sx={optionCardStyle(settings.primaryColor === color.name)}>
              <Box sx={{ width: 32, height: 32, bgcolor: color.hex, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {settings.primaryColor === color.name && <CheckIcon sx={{ color: "white", fontSize: 16 }} />}
              </Box>
            </Box>
          ))}

          {/* Custom Picker */}
          <Box
            onClick={(event) => setPickerAnchor(event.currentTarget)}
            sx={optionCardStyle(settings.primaryColor === "custom")}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "8px",
                bgcolor: settings.primaryColor === "custom" ? color.hex : alpha(theme.palette.text.secondary, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                color: settings.primaryColor === "custom" ? "#fff" : "text.secondary"
              }}
            >
              <i className="ri-palette-line" />
            </Box>
          </Box>

          <Popover
            open={Boolean(pickerAnchor)}
            anchorEl={pickerAnchor}
            onClose={() => setPickerAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                p: 1.5,
                mt: 1,
                borderRadius: "12px",
                boxShadow: theme.shadows[10],
                border: `1px solid ${theme.palette.divider}`,
              },
            }}
          >
            <Box sx={{ width: 200 }}>
              <ColorPicker
                width={200}
                height={120}
                color={color}
                onChange={(newColor) => {
                  setColor(newColor);
                  updateSettings({ primaryColor: "custom", customColor: newColor.hex });
                }}
                hideAlpha
                hideInput={["rgb", "hsv"]}
              />
            </Box>
          </Popover>
        </Stack>

        {/* Theme Mode */}
        <Typography
          variant="subtitle2"
          sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}
        >
          Theme Mode
        </Typography>
        <Stack direction="row" spacing={3} mb={4}>
          {[
            { value: "light", icon: <LightModeIcon />, label: "Light" },
            { value: "dark", icon: <DarkModeIcon />, label: "Dark" },
            { value: "system", icon: <MonitorIcon />, label: "System" },
          ].map((item) => {
            const selected = (settings.mode || "light") === item.value;
            return (
              <Box
                key={item.value}
                onClick={() => updateSettings({ mode: item.value })}
                sx={optionCardStyle(selected)}
              >
                <Box
                  sx={{
                    color: selected ? activeColor : "text.secondary",
                    textAlign: "center",
                    mb: 0.5,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant="caption"
                  display="block"
                  align="center"
                  fontWeight={selected ? 600 : 400}
                >
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Stack>

        {/* Skins */}
        <Typography
          variant="subtitle2"
          sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}
        >
          Skins
        </Typography>
        <Stack direction="row" spacing={3} mb={4}>
          {["default", "bordered"].map((skin) => {
            const selected = isSelected("skin", skin);
            const skinImages = {
              default: "/images/settings/skin-default.png",
              bordered: "/images/settings/skin-border.png",
            };

            return (
              <Box key={skin} sx={{ textAlign: "center" }}>
                <Box
                  onClick={() => updateSettings({ skin: skin })}
                  sx={{
                    ...optionCardStyle(selected),
                    p: 0,
                    overflow: "hidden",
                    display: "block",
                    width: "fit-content",
                  }}
                >
                  <Box
                    component="img"
                    src={skinImages[skin]}
                    alt={`${skin} skin`}
                    sx={{
                      display: "block",
                      height: 66,
                      objectFit: "contain",
                      transition: "transform 0.3s ease, filter 0.3s ease",
                      backgroundColor: alpha(activeColor, 0.05),
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{
                    mt: 1.5,
                    textTransform: "capitalize",
                    fontWeight: selected ? 600 : 400,
                    color: selected ? activeColor : "text.secondary",
                  }}
                >
                  {skin}
                </Typography>
              </Box>
            );
          })}
        </Stack>

        {/* Layout */}
        <Typography
          variant="subtitle2"
          sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}
        >
          Layout
        </Typography>
        <Stack direction="row" spacing={3} mb={4}>
          {["vertical", "collapsed", "horizontal"].map((item) => {
            const selected = isSelected("layout", item);
            const images = {
              vertical: "/images/settings/skin-default.png",
              collapsed: "/images/settings/Collapsed.png",
              horizontal: "/images/settings/Horizontal.png",
            };

            return (
              <Box key={item} sx={{ textAlign: "center" }}>
                <Box
                  onClick={() => updateSettings({ layout: item })}
                  sx={{
                    ...optionCardStyle(selected),
                    p: 0,
                    overflow: "hidden",
                    display: "block",
                    width: "fit-content",
                  }}
                >
                  <Box
                    component="img"
                    src={images[item]}
                    alt={`${item}`}
                    sx={{
                      display: "block",
                      height: 66,
                      objectFit: "contain",
                      transition: "transform 0.3s ease, filter 0.3s ease",
                      backgroundColor: alpha(activeColor, 0.1),
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{
                    mt: 1.5,
                    textTransform: "capitalize",
                    fontWeight: selected ? 600 : 400,
                    color: selected ? activeColor : "text.secondary",
                  }}
                >
                  {item}
                </Typography>
              </Box>
            );
          })}
        </Stack>

        {/* Content */}
        <Typography
          variant="subtitle2"
          sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}
        >
          Content
        </Typography>
        <Stack direction="row" spacing={3} mb={4}>
          {["compact", "wide"].map((item) => {
            const selected = isSelected("content", item);
            const images = {
              compact: "/images/settings/Compact.png",
              wide: "/images/settings/Wide.png"
            };

            return (
              <Box key={item} sx={{ textAlign: "center" }}>
                <Box
                  onClick={() => updateSettings({ contentWidth: item })}
                  sx={{
                    ...optionCardStyle(selected),
                    p: 0,
                    overflow: "hidden",
                    display: "block",
                    width: "fit-content",
                  }}
                >
                  <Box
                    component="img"
                    src={images[item]}
                    alt={`${item}`}
                    sx={{
                      display: "block",
                      height: 66,
                      objectFit: "contain",
                      transition: "transform 0.3s ease, filter 0.3s ease",
                      backgroundColor: alpha(activeColor, 0.1),
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{
                    mt: 1.5,
                    textTransform: "capitalize",
                    fontWeight: selected ? 600 : 400,
                    color: selected ? activeColor : "text.secondary",
                  }}
                >
                  {item}
                </Typography>
              </Box>
            );
          })}
        </Stack>

        {/* Direction */}
        <Typography
          variant="subtitle2"
          sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}
        >
          Direction
        </Typography>
        <Stack direction="row" spacing={3} mb={4}>
          {["ltr", "rtl"].map((item) => {
            const selected = isSelected("direction", item);
            const images = {
              ltr: "/images/settings/ltr.png",
              rtl: "/images/settings/rtl.png"
            };
            const directionLabels = {
              ltr: "Left to Right",
              rtl: "Right to Left"
            };

            return (
              <Box key={item} sx={{ textAlign: "center" }}>
                <Box
                  onClick={() => updateSettings({ direction: item })}
                  sx={{
                    ...optionCardStyle(selected),
                    p: 0,
                    overflow: "hidden",
                    display: "block",
                    width: "fit-content",
                  }}
                >
                  <Box
                    component="img"
                    src={images[item]}
                    alt={`${item}`}
                    sx={{
                      display: "block",
                      height: 66,
                      objectFit: "contain",
                      transition: "transform 0.3s ease, filter 0.3s ease",
                      backgroundColor: alpha(activeColor, 0.1),
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{
                    mt: 1.5,
                    textTransform: "capitalize",
                    fontWeight: selected ? 600 : 400,
                    color: selected ? activeColor : "text.secondary",
                  }}
                >
                  {directionLabels[item]}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Drawer>
  );
};

export default ThemeCustomizer;

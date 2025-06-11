import { DefaultTheme } from 'react-native-paper';

export const colors = {
  primary: '#2196F3',
  secondary: '#03DAC6',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  error: '#B00020',
  text: '#000000',
  onSurface: '#000000',
  disabled: '#757575',
  placeholder: '#9E9E9E',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  notification: '#FF4081',
  success: '#4CAF50',
  warning: '#FFC107',
  info: '#2196F3',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    light: 'System',
    thin: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
  spacing,
  typography,
  roundness: 8,
};

export type AppTheme = typeof theme; 
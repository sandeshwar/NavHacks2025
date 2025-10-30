// Theme utility functions and constants

// Color palette
export const colors = {
  // Background colors
  background: {
    primary: '#fdfdfd',
    secondary: '#f8f8f8',
    tertiary: '#f0f0f0',
  },
  
  // Text colors
  text: {
    primary: '#2d2d2d',
    secondary: '#555555',
    tertiary: '#888888',
  },
  
  // Accent colors
  accent: {
    primary: '#2c3e50',
    secondary: '#34495e',
    tertiary: '#7f8c8d',
  },
  
  // Status colors
  status: {
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',
  },
  
  // Border colors
  border: {
    primary: '#e0e0e0',
    hover: '#cccccc',
  },
};

// Dark mode colors
export const darkColors = {
  // Background colors
  background: {
    primary: '#121212',
    secondary: '#1e1e1e',
    tertiary: '#2a2a2a',
  },
  
  // Text colors
  text: {
    primary: '#f0f0f0',
    secondary: '#cccccc',
    tertiary: '#aaaaaa',
  },
  
  // Accent colors
  accent: {
    primary: '#a0aec0',
    secondary: '#cbd5e0',
    tertiary: '#e2e8f0',
  },
  
  // Status colors
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  
  // Border colors
  border: {
    primary: '#374151',
    hover: '#4b5563',
  },
};

// Typography
export const typography = {
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  },
};

// Spacing scale
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
};

// Border radius
export const borderRadius = {
  sm: '0.125rem',
  md: '0.25rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

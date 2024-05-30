// Layout.jsx
import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';

export default function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

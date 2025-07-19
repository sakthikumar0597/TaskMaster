import React from 'react';
import { Switch, FormControlLabel, Box } from '@mui/material';

const Settings = ({ sidebarCollapsed, isDark, toggleTheme, }) => {
  return (<div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
    <Box sx={{ p: 2 }}>
      <div className="content-header">
        <h1 className="content-title">Settings</h1>
      </div>
      <FormControlLabel
        control={
          <Switch
            checked={isDark}
            onChange={toggleTheme}
            name="themeToggle"
            color="primary"
          />
        }
        label="Dark Mode"
      />
    </Box>
  </div>
  );
};

export default Settings;
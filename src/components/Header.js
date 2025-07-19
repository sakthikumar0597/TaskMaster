import React from 'react';
import { Menu, User, Moon, Sun } from 'lucide-react';
import Tooltip from '@mui/material/Tooltip';
import '../styles/Homescreen.css';

const Header = ({ isDark, toggleTheme, sidebarCollapsed, toggleSidebar }) => (
  <div className={`header ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
    <div className="header-title">
      <button className="menu-toggle1" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>
      TaskMaster
    </div>
    <div className="header-actions">
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <Tooltip title="Sakthikumar, React Developer" arrow>
        <div className="user-profile">
          <User size={20} />
        </div>
      </Tooltip>
    </div>
  </div>
);

export default Header;
import React, { useState } from 'react';
import { Check, Menu, X, Settings, BarChart3 } from 'lucide-react';
import { NavLink } from "react-router-dom";

import '../styles/Homescreen.css';
const Sidebar = ({ collapsed, toggleSidebar, mobileOpen }) => {
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <button className="menu-toggle" onClick={toggleSidebar}>
          {collapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>
      <ul className="nav-links">
        <li className="nav-item">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <BarChart3 className="nav-icon" size={20} />
            <span className="nav-text">Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <Check className="nav-icon" size={20} />
            <span className="nav-text">Tasks</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <Settings className="nav-icon" size={20} />
            <span className="nav-text">Settings</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
};

export default Sidebar;
